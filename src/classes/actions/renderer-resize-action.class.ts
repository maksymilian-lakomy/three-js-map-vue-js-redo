import { OrthographicCamera, Scene, WebGLRenderer } from "three";
import { Action } from "./index";
import { cameraFrustum } from "@/helpers";
import { CameraFrustum } from "@/models";
import { ExposedActions } from './action.class';

export class RendererResizeAction extends Action implements ExposedActions {
  public readonly events = [];

  public constructor(
    scene: Scene,
    camera: OrthographicCamera,
    renderer: WebGLRenderer,
    container: HTMLElement
  ) {
    super(scene, camera, renderer, container);

    addEventListener("resize", this.onResize.bind(this));
  }

  private destinationFrustum: CameraFrustum | null = null;

  private onResize(): void {
    this.destinationFrustum = cameraFrustum(this.container);
  }

  public action(): void {
    if (!this.destinationFrustum) {
      return;
    }
    const { clientWidth, clientHeight } = this.container;
    this.renderer.setSize(clientWidth, clientHeight);

    const { left, right, top, bottom, near, far } = this.destinationFrustum;

    this.camera.left = left;
    this.camera.right = right;
    this.camera.top = top;
    this.camera.bottom = bottom;
    near && (this.camera.near = near);
    far && (this.camera.far = far);

    this.camera.updateProjectionMatrix();
    this.destinationFrustum = null;
  }

  public destroy(): void {
    removeEventListener("resize", this.onResize);
  }
}
