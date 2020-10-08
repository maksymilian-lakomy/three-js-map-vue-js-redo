import {
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PlaneBufferGeometry,
  Texture,
  TextureLoader,
  Vector3,
} from "three";
import { TileOptions } from "@/models";

export async function mapMeshFactory({
  inColumn,
  paths: tilePaths,
}: TileOptions): Promise<Object3D> {
  const tileSize = 300;
  const mapContainer = new Object3D();

  const textureLoader = new TextureLoader();
  const loadedTiles: Texture[] = await Promise.all(
    tilePaths.map((_tilePath) => textureLoader.loadAsync(_tilePath))
  );

  loadedTiles.forEach((_tile, _index) => {
    // TODO - PROPABLY SLIGHTLY BETTER PERFORMANCE WITH ASYNC FUNCTION?
    const geometry = new PlaneBufferGeometry(tileSize, tileSize, 1, 1);
    const material = new MeshBasicMaterial({ map: _tile });
    const mesh = new Mesh(geometry, material);

    const offset = new Vector3(
      (_index % inColumn) * tileSize,
      Math.floor(_index / inColumn) * tileSize,
      0
    );
    mesh.position.set(offset.x, offset.y, offset.z);
    mesh.updateMatrixWorld();

    mapContainer.add(mesh);
  });

  return mapContainer;
}
