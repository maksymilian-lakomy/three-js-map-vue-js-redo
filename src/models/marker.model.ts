import { Object3D, Vector2 } from 'three';

export interface Marker {
    visual: Object3D;
    position: Vector2[];
}