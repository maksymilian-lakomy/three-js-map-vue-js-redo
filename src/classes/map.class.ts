import { OrthographicCamera, Scene, Vector2, WebGLRenderer } from "three";
import { CameraFrustum } from "@/models";

export class Map {
  public scene: Scene;
  public camera: OrthographicCamera;
  public renderer: WebGLRenderer;

  public constructor(private container: HTMLElement) {
    this.scene = new Scene();

    const { left, right, top, bottom, near, far } = this.cameraFrustum;
    this.camera = new OrthographicCamera(left, right, top, bottom, near, far);

    this.renderer = new WebGLRenderer();

    const { x: width, y: height } = this.size;
    this.renderer.setSize(width, height);

    this.container.appendChild(this.renderer.domElement);
  }

  private get cameraFrustum(): CameraFrustum {
    const width = this.container.offsetWidth;
    const height = this.container.offsetHeight;

    return {
      left: width / -2,
      right: width / 2,
      top: height / 2,
      bottom: height / -2,
      near: 1,
      far: 1000,
    };
  }

  private get size(): Vector2 {
    return new Vector2(this.container.offsetWidth, this.container.offsetHeight);
  }

  public render(): void {
    this.renderer.render(this.scene, this.camera);
  } 
}
