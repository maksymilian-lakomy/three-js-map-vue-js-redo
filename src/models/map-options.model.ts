export type TilePath = string;

export interface TileOptions {
  /** How many tiles are in column */
  inColumn: number;

  /** Provided in order from bottom left to top right */
  paths: TilePath[];
}

export interface MapOptions {
  /** For proper map scale */
  vertices: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  };

  tileOptions: TileOptions;
}
