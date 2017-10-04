import { NotationStroke } from './notation-stroke';

export interface NotationAtomStroke {
  type: string;
  strokes: string[];
  boardId: string;
  cursor: boolean;

  alternative: NotationStroke[][];
}
