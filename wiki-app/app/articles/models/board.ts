import { Square } from './square';
import { BoardIdNotation } from './boardid-notation';

export class Board {
  id: string;
  squares: Square[];
  selectedSquare: Square | null;
  nextSquare: Square | null;
  previousBoards: BoardIdNotation[];
  nextBoards: BoardIdNotation[];
  rules: string;
  black: boolean;
}
