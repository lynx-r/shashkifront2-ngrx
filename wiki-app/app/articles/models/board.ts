import { Square } from './square';
import { Draught } from './draught';
import { Rules } from './rules';
import { BoardChanger } from './board-changer';
export interface Board {
  id: string;
  squares: Square[];
  selectedSquare: Square | null;
  nextSquare: Square | null;
  boardHistoryId: BoardChanger;
  rules: string;
  black: boolean;
}
