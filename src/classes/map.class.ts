import { OrthographicCamera, Scene, Vector2, WebGLRenderer } from "three";
import { MapOptions } from "@/models";
import { cameraFrustum, mapMeshFactory } from "@/helpers";
import { Action, ActionType } from "./actions";

export class Map {
  public static actions: ActionType[] = [];

  public scene: Scene;
  public camera: OrthographicCamera;
  public renderer: WebGLRenderer;

  private registeredActions: Action[] = [];

  public constructor(private container: HTMLElement) {
    this.scene = new Scene();

    const { left, right, top, bottom, near, far } = cameraFrustum(container);
    this.camera = new OrthographicCamera(left, right, top, bottom, near, far);
    this.camera.position.set(400, 500, 10);

    this.renderer = new WebGLRenderer();

    const { x: width, y: height } = this.size;
    this.renderer.setSize(width, height);

    Map.actions.forEach((action) => {
      this.registeredActions.push(
        new action(this.scene, this.camera, this.renderer, this.container)
      );
    });

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
}
