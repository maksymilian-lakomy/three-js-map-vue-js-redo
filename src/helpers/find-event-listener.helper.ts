import { Listener, ListenerData } from "@/models";

export function findEventListener(
  listeners: ListenerData[],
  eventName: string,
  listener: Listener
): number {
  return listeners.findIndex(
    ({ eventName: _eventName, listener: _listener }) =>
      _eventName === eventName && _listener === listener
  );
}
