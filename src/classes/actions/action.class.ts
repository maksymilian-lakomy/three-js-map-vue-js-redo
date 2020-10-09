import { EventEmitter } from "@/mixins/subject.mixin";
import { Subject } from "@/models";
import { OrthographicCamera, Scene, WebGLRenderer } from "three";

export interface ExposedAction extends Subject {
  events: ReadonlyArray<string>;
  action(): void;
  destroy(): void;
}

class BaseAction {
  public constructor(
    protected readonly scene: Scene,
    protected readonly camera: OrthographicCamera,
    protected readonly renderer: WebGLRenderer,
    protected readonly container: HTMLElement
  ) {}
}

export const Action = EventEmitter(BaseAction);
