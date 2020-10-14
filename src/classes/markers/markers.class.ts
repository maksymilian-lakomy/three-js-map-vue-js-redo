import { InstancedMesh, Object3D } from "three";
import { MarkersData } from "@/models";

export class Markers {
  public readonly container = new Object3D();

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
    const positioner = new Object3D();

    positions.forEach((position, i) => {
      positioner.position.set(position.x, position.y, 1);
      positioner.updateMatrix();
      markersObject.setMatrixAt(i, positioner.matrix.clone());
    });

    return markersObject;
  }
}
