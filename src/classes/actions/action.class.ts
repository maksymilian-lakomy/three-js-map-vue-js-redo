import { OrthographicCamera, Scene, WebGLRenderer } from "three";

export abstract class Action {
  public constructor(
    protected readonly scene: Scene,
    protected readonly camera: OrthographicCamera,
    protected readonly renderer: WebGLRenderer,
    protected readonly container: HTMLElement
  ) {}

  public abstract action(): void;

  public abstract destroy(): void;
}
