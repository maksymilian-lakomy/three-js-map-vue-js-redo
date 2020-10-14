import {
  Box3,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PlaneBufferGeometry,
  Texture,
  TextureLoader,
  Vector3,
} from "three";
import { MapOptions } from "@/models";

export async function mapMeshFactory(options: MapOptions): Promise<Object3D> {
  const tileWidth = options.size / options.tileOptions.inColumn;
  const tileHeight =
    (tileWidth * options.tileOptions.proportions.vertical) /
    options.tileOptions.proportions.horizontal;

  const mapContainer = new Object3D();

  const textureLoader = new TextureLoader();
  const loadedTiles: Texture[] = await Promise.all(
    options.tileOptions.paths.map((_tilePath) =>
      textureLoader.loadAsync(_tilePath)
    )
  );

  loadedTiles.forEach((_tile, _index) => {
    // TODO - PROPABLY SLIGHTLY BETTER PERFORMANCE WITH ASYNC FUNCTION?
    const geometry = new PlaneBufferGeometry(tileWidth, tileHeight, 1, 1);
    const material = new MeshBasicMaterial({ map: _tile });
    const mesh = new Mesh(geometry, material);

    const offset = new Vector3(
      (_index % options.tileOptions.inColumn) * tileWidth,
      Math.floor(_index / options.tileOptions.inColumn) * tileHeight,
      0
    );
    mesh.position.set(offset.x, offset.y, offset.z);
    mesh.updateMatrixWorld();

    mapContainer.add(mesh);
  });

  const boundingBox = new Box3().setFromObject(mapContainer);

  const size = new Vector3(0, 0, 0);

  boundingBox.getCenter(size);

  mapContainer.position.sub(size);

  return mapContainer;
}
