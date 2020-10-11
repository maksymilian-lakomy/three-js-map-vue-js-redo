import { OrthographicCamera, Scene, WebGLRenderer } from "three";
import { MapOptions } from "@/models";
import { cameraFrustum, mapMeshFactory } from "@/helpers";
import { ActionType, ExposedAction } from "../actions";
import { EventEmitter } from "@/mixins/subject.mixin";
import { Markers } from "../markers/markers.class";

class BaseMap {
  public scene: Scene;
  public camera: OrthographicCamera;
  public renderer: WebGLRenderer;

  public constructor(protected container: HTMLElement) {
    this.scene = new Scene();

    const { left, right, top, bottom, near, far } = cameraFrustum(container);
    this.camera = new OrthographicCamera(left, right, top, bottom, near, far);
    this.camera.position.set(0, 0, 10);

    this.renderer = new WebGLRenderer();

    const { offsetWidth: width, offsetHeight: height } = this.container;
    this.renderer.setSize(width, height);

    this.container.appendChild(this.renderer.domElement);
  }
}

const EventEmmiterMap = EventEmitter(BaseMap);

export class Map extends EventEmmiterMap {
  private actions: ExposedAction[] = [];
  private markers?: Markers;

  public constructor(container: HTMLElement, actions: readonly ActionType[] = []) {
    super(container);
    this.registerActions(actions);
  }

  private registerActions(actions: readonly ActionType[]): void {
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

  public async setMap(mapOptions: Readonly<MapOptions>) {
    this.scene.add(await mapMeshFactory(mapOptions.tileOptions));
  }

  public render(): void {
    this.actions.forEach((action) => action.action());
    this.renderer.render(this.scene, this.camera);
  }

  public initializeMarkers(): Markers {
    this.destroyMarkers();

    this.markers = new Markers();
    this.scene.add(this.markers.container);

    return this.markers;
  }

  public destroyMarkers(): void {
    this.markers && this.scene.remove(this.markers.container);
    this.markers = undefined;
  }
}
