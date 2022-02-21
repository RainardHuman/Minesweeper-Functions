export interface Tile {
  state: 'hidden' | 'flagged' | 'revealed';
  isMine: boolean;
  adjacentMines: number;
}

export interface Columns {
  tiles: Tile[];
}

export interface Board {
  width: number;
  height: number;
  mines: number;
  rows: Columns[]
}
