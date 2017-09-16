import { Square } from './square';

export class Move {
  targetSquare: Square;
  selectedSquare?: Square;
  undoMove?: boolean;
  moveDist?: {
    /**
     * distance to move
     */
    v: number;
    /**
     * distance to move
     */
    h: number;

    queen: boolean;
  };
}
