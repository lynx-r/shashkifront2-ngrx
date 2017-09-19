import { Square } from './square';
import { Draught } from './draught';
import { Rules } from './rules';
import { BoardChanger } from './board-changer';
export interface Board {
  id: string;
  squares: Square[];
  boardHistoryId: BoardChanger;
  squareSize: number;
  rules: Rules;
  black: boolean;
}
