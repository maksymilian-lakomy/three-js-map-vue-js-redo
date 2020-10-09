import { OrthographicCamera, Scene, Vector2, WebGLRenderer } from "three";
import { Event, Listener, ListenerData, MapOptions, Subject } from "@/models";
import { cameraFrustum, findEventListener, mapMeshFactory } from "@/helpers";
import { Action, ActionType } from "./actions";

export class Map implements Subject {
  public static actions: ActionType[] = [];

  public scene: Scene;
  public camera: OrthographicCamera;
  public renderer: WebGLRenderer;

  private registeredActions: Action[] = [];
  private listeners: ListenerData[] = [];

  public constructor(private container: HTMLElement) {
    this.scene = new Scene();

    const { left, right, top, bottom, near, far } = cameraFrustum(container);
    this.camera = new OrthographicCamera(left, right, top, bottom, near, far);
    this.camera.position.set(400, 500, 10);

    this.renderer = new WebGLRenderer();

    const { x: width, y: height } = this.size;
    this.renderer.setSize(width, height);

    this.registerActions();
    this.container.appendChild(this.renderer.domElement);
  }

  private get size(): Vector2 {
    return new Vector2(this.container.offsetWidth, this.container.offsetHeight);
  }

  public async setMap(mapOptions: MapOptions) {
    this.scene.add(await mapMeshFactory(mapOptions.tileOptions));
  }

  public render(): void {
    this.registeredActions.forEach((action) => action.action());
    this.renderer.render(this.scene, this.camera);
  }

  private registerActions(): void {
    Map.actions.forEach((_action) =>
      this.registeredActions.push(
        new _action(this.scene, this.camera, this.renderer, this.container)
      )
    );

    this.registeredActions.forEach((_action) =>
      _action.events.forEach((_eventName) =>
        _action.addEventListener(_eventName, (event) => {
          this.notify(_eventName, event);
        })
      )
    );
  }

  public addEventListener(eventName: string, listener: Listener): void {
    const index = findEventListener(this.listeners, eventName, listener);
    index === -1 && this.listeners.push({ eventName, listener });
  }

  public removeEventListener(eventName: string, listener: Listener): void {
    const index = findEventListener(this.listeners, eventName, listener);
    index !== -1 && this.listeners.splice(index, 1);
  }

  private notify(eventName: string, event: Event): void {
    this.listeners.forEach(({ listener: _listener, eventName: _eventName }) => {
      _eventName === eventName && _listener(event);
    });
  }
}
