import { Event } from "./event.model";

type Listener = (event: Event) => void;

export type { Listener };

export interface ListenerData {
  eventName: string;
  listener: Listener;
}