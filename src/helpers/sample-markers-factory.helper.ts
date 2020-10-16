import { MapOptions, MarkersData } from "@/models";
import {
  Mesh,
  MeshBasicMaterial,
  PlaneBufferGeometry,
  TextureLoader,
  Vector2,
} from "three";

/* eslint @typescript-eslint/no-var-requires: "off" */
const sample = require("@/assets/sample-icon.png");

export const sampleMarkersFactory = async ({
  vertices,
}: MapOptions): Promise<MarkersData> => {
  const geometry = new PlaneBufferGeometry(5, 5, 1, 1);
  const texture = await new TextureLoader().loadAsync(sample);

  const material = new MeshBasicMaterial({ map: texture, alphaTest: .5 });

  const width = vertices.left - vertices.right;
  const height = vertices.bottom - vertices.top;

  const visual = new Mesh(geometry, material);
  const positions: Vector2[] = new Array(10000)
    .fill({})
    .map(() => new Vector2(Math.random() * width, Math.random() * height));

  return {
    visual,
    positions,
  };
};
