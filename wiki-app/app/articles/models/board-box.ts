import { Board } from './board';
import { Notation } from './notation';

export interface BoardBox {
  id: string;
  articleId: string;
  boardId: string;
  board: Board;
  whitePlayer: string;
  blackPlayer: string;
  event: string;
  site: string;
  round: string;
  date: Date;
  result: string;
  gameType: string;
  notation: Notation;
}
