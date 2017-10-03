import { Board } from './board';

export interface BoardBox {
  id: string;
  articleId: string;
  board: Board;
  whitePlayer: string;
  blackPlayer: string;
  event: string;
  site: string;
  round: string;
  date: Date;
  result: string;
  gameType: string;
}
