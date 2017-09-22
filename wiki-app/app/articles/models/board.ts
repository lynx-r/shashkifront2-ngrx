import { Draught } from './draught';
import { Square } from './square';
import { BoardBox } from './board-box';

export class Board {
  id: string;
  squares: Square[];
  selectedSquare: Square | null;
  nextSquare: Square | null;
  rules: string;
  black: boolean;
}
