import { findEventListener } from '@/helpers';
import type { Listener } from "@/models";
import { Subject, Event, ListenerData } from "@/models";
import { OrthographicCamera, Scene, WebGLRenderer } from "three";

export abstract class Action implements Subject {
  private listeners: ListenerData[] = [];
  public readonly abstract events: ReadonlyArray<string>; 

  public constructor(
    protected readonly scene: Scene,
    protected readonly camera: OrthographicCamera,
    protected readonly renderer: WebGLRenderer,
    protected readonly container: HTMLElement
  ) {}

  public abstract action(): void;

  public abstract destroy(): void;

  public addEventListener(eventName: string, listener: Listener): void {
    const index = findEventListener(this.listeners, eventName, listener);
    index === -1 && this.listeners.push({ eventName, listener });
  }

  public removeEventListener(eventName: string, listener: Listener): void {
    const index = findEventListener(this.listeners, eventName, listener);
    index !== -1 && this.listeners.splice(index, 1);
  }

  protected notify(eventName: string, event: Event): void {
    this.listeners.forEach(({listener: _listener, eventName: _eventName}) => 
      _eventName === eventName && _listener(event)
    );
  }
}
