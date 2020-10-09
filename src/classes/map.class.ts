import { OrthographicCamera, Scene, WebGLRenderer } from "three";
import { MapOptions } from "@/models";
import { cameraFrustum, mapMeshFactory } from "@/helpers";
import { ActionType, ExposedAction } from "./actions";
import { EventEmitter } from "@/mixins/subject.mixin";

class BaseMap {
  public scene: Scene;
  public camera: OrthographicCamera;
  public renderer: WebGLRenderer;

  public constructor(protected container: HTMLElement) {
    this.scene = new Scene();

    const { left, right, top, bottom, near, far } = cameraFrustum(container);
    this.camera = new OrthographicCamera(left, right, top, bottom, near, far);
    this.camera.position.set(400, 500, 10);

    this.renderer = new WebGLRenderer();

    const { offsetWidth: width, offsetHeight: height } = this.container;
    this.renderer.setSize(width, height);

    this.container.appendChild(this.renderer.domElement);
  }
}

const EventEmmiterMap = EventEmitter(BaseMap);

export class Map extends EventEmmiterMap {
  private actions: ExposedAction[] = [];

  public constructor(container: HTMLElement, actions: ActionType[]) {
    super(container);
    this.registerActions(actions);
  }

  private registerActions(actions: ActionType[]): void {
    actions.forEach((_action) =>
      this.actions.push(
        new _action(this.scene, this.camera, this.renderer, this.container)
      )
    );

    this.actions.forEach((_action) =>
      _action.events.forEach((_eventName) =>
        _action.addEventListener(_eventName, (event) => {
          this.notify(_eventName, event);
        })
      )
    );
  }

  public async setMap(mapOptions: MapOptions) {
    this.scene.add(await mapMeshFactory(mapOptions.tileOptions));
  }

  public render(): void {
    this.actions.forEach((action) => action.action());
    this.renderer.render(this.scene, this.camera);
  }
}
