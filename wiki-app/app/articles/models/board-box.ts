import { Board } from './board';
import { Notation } from './notation';

export interface BoardBox {
  id: string;
  articleId: string;
  boardId: string;
  board: Board;
  notation: Notation;
}
