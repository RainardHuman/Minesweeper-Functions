import {Board, Tile} from './game.interface';

export interface GenerateGameRequest {
  size: number,
  mines: number,
}

export interface GameActionRequest {
  tile: Tile,
  board: Board,
}
