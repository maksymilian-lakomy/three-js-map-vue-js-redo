import { MapOptions, MarkersData } from "@/models";
import { Mesh, MeshBasicMaterial, PlaneBufferGeometry, Vector2 } from "three";

export const sampleMarkersFactory = ({ vertices }: MapOptions): MarkersData => {
  const geometry = new PlaneBufferGeometry(2, 2, 1, 1);
  const material = new MeshBasicMaterial({ color: "red" });

  const width = Math.abs(vertices.left - vertices.right);
  const height = Math.abs(vertices.top - vertices.bottom);

  const visual = new Mesh(geometry, material);
  const positions: Vector2[] = new Array(10000)
    .fill({})
    .map(() => new Vector2(Math.random() * width, Math.random() * height));

  return {
    visual,
    positions,
  };
};
