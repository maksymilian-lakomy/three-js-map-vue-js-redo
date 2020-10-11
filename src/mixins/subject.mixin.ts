import { findEventListener } from "@/helpers/find-event-listener.helper";
import { Event, Listener, ListenerData, Subject } from "@/models";

type Constructor = new (...args: any[]) => {};

export function EventEmitter<T extends Constructor>(Base: T) {
  return class EventEmitter extends Base implements Subject {
    public listeners: ListenerData[] = [];

    public addEventListener(eventName: string, listener: Listener): void {
      const index = findEventListener(this.listeners, eventName, listener);
      index === -1 && this.listeners.push({ eventName, listener });
    }

    public removeEventListener(eventName: string, listener: Listener): void {
      const index = findEventListener(this.listeners, eventName, listener);
      index !== -1 && this.listeners.splice(index, 1);
    }

    public removeAllListeners(): void {
      this.listeners = [];
    }

    public notify(eventName: string, event: Event): void {
      this.listeners.forEach(
        ({ listener: _listener, eventName: _eventName }) =>
          _eventName === eventName && _listener(event)
      );
    }
  };
}
