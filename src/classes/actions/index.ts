import { CameraMovementAction } from "./camera-movement-action.class";
import { CameraZoomAction } from "./camera-zoom-action.class";
import { RendererResizeAction } from './renderer-resize-action.class';

export * from "./action.class";
export * from "./camera-movement-action.class";
export * from "./camera-zoom-action.class";
export * from "./renderer-resize-action.class";

export type ActionType =
  | typeof CameraMovementAction
  | typeof CameraZoomAction
  | typeof RendererResizeAction;
