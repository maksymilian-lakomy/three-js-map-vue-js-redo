import { OrthographicCamera, Scene, Vector3, WebGLRenderer } from "three";
import { CameraMoveEvent } from "./action.events";
import { Action } from "./index";

export class CameraMovementAction extends Action {
  public readonly events = ['startcameramove', 'endcameramove', 'cameramove'];

  constructor(
    scene: Scene,
    camera: OrthographicCamera,
    renderer: WebGLRenderer,
    container: HTMLElement
  ) {
    super(scene, camera, renderer, container);

    addEventListener("mousedown", this.onMouseDown.bind(this));
    addEventListener("mousemove", this.onMouseMove.bind(this));
    addEventListener("mouseup", this.onMouseUp.bind(this));
  }

  private startCameraPosition: Vector3 | null = null;
  private startPosition: Vector3 | null = null;
  private destinationPosition: Vector3 | null = null;

  private onMouseDown(event: MouseEvent): void {
    this.startPosition = new Vector3(-event.clientX, event.clientY, 0);
    this.startCameraPosition = this.camera.position.clone();

    this.notify("startcameramove", {});
  }

  private onMouseMove(event: MouseEvent): void {
    if (!this.startPosition || !this.startCameraPosition) {
      return;
    }

    const mousePosition = new Vector3(-event.clientX, event.clientY, 0);
    const difference = mousePosition
      .clone()
      .sub(this.startPosition)
      .divideScalar(this.camera.zoom);

    this.destinationPosition = this.startCameraPosition.clone().add(difference);
  }

  private onMouseUp(): void {
    this.startPosition = null;
    this.startCameraPosition = null;
    this.destinationPosition = null;

    this.notify("endcameramove", {});
  }

  public action(): void {
    if (!this.destinationPosition) {
      return;
    }

    this.camera.position.set(
      this.destinationPosition.x,
      this.destinationPosition.y,
      this.destinationPosition.z
    );

    const event: CameraMoveEvent = {
      cameraPosition: this.camera.position.clone(),
    };

    this.notify("cameramove", event);
  }

  public destroy(): void {
    removeEventListener("mousedown", this.onMouseDown);
    removeEventListener("mousemove", this.onMouseMove);
    removeEventListener("mouseup", this.onMouseUp);
  }
}
