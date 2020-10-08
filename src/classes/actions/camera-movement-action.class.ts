import {
  OrthographicCamera,
  Raycaster,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { Action } from "./index";

export class CameraMovementAction extends Action {
  constructor(
    scene: Scene,
    camera: OrthographicCamera,
    renderer: WebGLRenderer
  ) {
    super(scene, camera, renderer);

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
  }

  private onMouseMove(event: MouseEvent): void {
    if (!this.startPosition || !this.startCameraPosition) {
      return;
    }

    const mousePosition = new Vector3(-event.clientX, event.clientY, 0);
    this.destinationPosition = this.startCameraPosition
      .clone()
      .add(mousePosition)
      .sub(this.startPosition);
  }

  private onMouseUp(): void {
    this.startPosition = null;
    this.startCameraPosition = null;
    this.destinationPosition = null;
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
  }

  public destroy(): void {
    removeEventListener("mousedown", this.onMouseDown);
    removeEventListener("mousemove", this.onMouseMove);
    removeEventListener("mouseup", this.onMouseUp);
  }
}
