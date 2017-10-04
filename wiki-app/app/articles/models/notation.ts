import { NotationStroke } from './notation-stroke';

export interface Notation {
  whitePlayer: string;
  blackPlayer: string;
  event: string;
  site: string;
  round: string;
  date: Date;
  result: string;
  gameType: string;

  notationStrokes: NotationStroke[];
}
