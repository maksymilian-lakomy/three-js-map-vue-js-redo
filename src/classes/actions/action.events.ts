import { Event } from "@/models";
import { Vector3 } from "three";

export interface CameraMoveEvent extends Event {
  cameraPosition: Vector3;
}

type ActionEvent = CameraMoveEvent;

export type {ActionEvent};