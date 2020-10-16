import { Box3, InstancedMesh, Object3D, Vector2, Vector3 } from "three";
import { MapOptions, MarkersData } from "@/models";

export class Markers {
  public readonly container = new Object3D();

  constructor(
    private readonly mapOptions: MapOptions,
    private readonly mapMesh: Object3D
  ) {}

  public addMarkers(markersData: MarkersData): number {
    const markersDataClone: MarkersData = {
      visual: markersData.visual.clone(),
      positions: markersData.positions.map((position) => position.clone()),
    };

    const markersObject = this.createMarkersMesh(markersDataClone);
    this.container.add(markersObject);

    return markersObject.id;
  }

  public removeMarkers(markersId: number): void {
    const markersObject = this.container.children.find(
      (marker) => marker.id === markersId
    );

    markersObject && this.container.remove(markersObject);
  }

  private createMarkersMesh({ visual, positions }: MarkersData): InstancedMesh {
    const markersObject = new InstancedMesh(
      visual.geometry,
      visual.material,
      positions.length
    );

    const { vertices } = this.mapOptions;

    const mapSizes = new Vector2(
      vertices.left - vertices.right,
      vertices.bottom - vertices.top
    );

    const box3 = new Box3().setFromObject(this.mapMesh);

    const positioner = new Object3D();
    const mapSize = new Vector3();
    box3.getSize(mapSize);

    const mapCenter = new Vector3();
    box3.getCenter(mapCenter);

    positions.forEach((position, i) => {
      const centerRelevantPosition = position
        .clone()
        .divide(mapSizes)
        .multiply(new Vector2(mapSize.x, mapSize.y))
        .sub(new Vector2(mapSize.x / 2, mapSize.y /2));

      positioner.position.set(
        centerRelevantPosition.x,
        centerRelevantPosition.y,
        1
      );
      positioner.updateMatrix();
      markersObject.setMatrixAt(i, positioner.matrix.clone());
    });

    return markersObject;
  }
}
