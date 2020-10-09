import { Event } from 'three';
import { Listener } from "./listener.model";

export interface Subject {
  addEventListener(eventName: string, listener: Listener): void;
  removeEventListener(eventName: string, listener: Listener): void;
}
