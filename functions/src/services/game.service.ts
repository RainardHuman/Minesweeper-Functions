import {Board, Columns, Tile} from '../interfaces/game.interface';

export const generateBoard = (size: number, mines: number): Board => {
  let board: Board = {
    width: size,
    height: size,
    mines: mines,
    rows: [],
  };

  for (let i = 0; i < size; i++) {
    const row: Columns = {
      tiles: [],
    };

    for (let j = 0; j < size; j++) {
      const tile: Tile = {
        state: 'hidden',
        isMine: false,
        adjacentMines: 0,
      };


      row.tiles.push(tile);
    }
    board.rows.push(row);
  }

  board = randomMines(size, mines, board);
  board = adjacentMines(size, board);

  return board;
};

const adjacentMines = (size: number, board: Board): Board => {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (board.rows[i].tiles[j].isMine) {
        continue;
      }
      let adjacentMines = 0;
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          if (i + x >= 0 && i + x < size && j + y >= 0 && j + y < size) {
            if (board.rows[i + x].tiles[j + y].isMine) {
              adjacentMines++;
            }
          }
        }
      }
      board.rows[i].tiles[j].adjacentMines = adjacentMines;
    }
  }

  return board;
};

const randomMines = (size: number, mines: number, board: Board): Board => {
  for (let i = 0; i < mines; i++) {
    const randomRow = Math.floor(Math.random() * size);
    const randomCol = Math.floor(Math.random() * size);
    if (board.rows[randomRow].tiles[randomCol].isMine) {
      i--;
    } else {
      board.rows[randomRow].tiles[randomCol].isMine = true;
    }
  }
  return board;
};
