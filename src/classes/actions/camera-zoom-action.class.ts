import {
  MathUtils,
  OrthographicCamera,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { Action } from "./index";

export class CameraZoomAction extends Action {
  constructor(
    scene: Scene,
    camera: OrthographicCamera,
    renderer: WebGLRenderer
  ) {
    super(scene, camera, renderer);

    addEventListener("mousemove", this.onMouseMove.bind(this));
    addEventListener("wheel", this.onWheel.bind(this));
  }

  private readonly p = 0.1;
  private readonly q = 0.2;
  private readonly clampMin = 1;
  private readonly clampMax = 10;

  private destinationZoom: number | null = null;

  private mousePosition = new Vector3(0, 0, 0);

  private toZoom(x: number) {
    return this.p * Math.pow(x, 2) + this.q;
  }

  private toNormal(y: number) {
    return Math.sqrt((-this.q + y) / this.p);
  }

  private onWheel(event: WheelEvent) {
    const delta = -event.deltaY;

    const zoom = this.toZoom(
      MathUtils.clamp(
        this.toNormal(this.camera.zoom) + delta / 250,
        this.clampMin,
        this.clampMax
      )
    );

    if (zoom === this.camera.zoom) {
      return;
    }

    this.destinationZoom = zoom;
  }

  private onMouseMove(event: MouseEvent): void {
    this.mousePosition.set(event.clientX, event.clientY, 0);
  }

  public action(): void {
    if (!this.destinationZoom) {
      return;
    }

    this.camera.zoom = this.destinationZoom;
    this.camera.updateProjectionMatrix();
    this.destinationZoom = null;
  }

  public destroy(): void {
    removeEventListener("mousemove", this.onMouseMove);
    removeEventListener("wheel", this.onWheel);
  }
}
