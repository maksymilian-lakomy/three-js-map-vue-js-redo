import { Listener, Subject, Event } from "@/models";
import { OrthographicCamera, Scene, WebGLRenderer } from "three";

export abstract class Action implements Subject {
  private listeners: { eventName: string; listener: Listener }[] = [];

  public constructor(
    protected readonly scene: Scene,
    protected readonly camera: OrthographicCamera,
    protected readonly renderer: WebGLRenderer,
    protected readonly container: HTMLElement
  ) {}

  public abstract action(): void;

  public abstract destroy(): void;

  public addEventListener(eventName: string, listener: Listener): void {
    const index = this.listeners.find(
      ({ listener: _listener, eventName: _eventName }) =>
        _listener === listener && _eventName === eventName
    );
    !index && this.listeners.push({ eventName, listener });
  }

  public removeEventListener(eventName: string, listener: Listener): void {
    const index = this.listeners.findIndex(
      ({ listener: _listener, eventName: _eventName }) =>
        _listener === listener && _eventName === eventName
    );
    index && this.listeners.splice(index, 1);
  }

  protected notify(eventName: string, event: Event): void {
    this.listeners.forEach((_listener) => {
      _listener.eventName === eventName && _listener.listener(event);
    });
  }
}
