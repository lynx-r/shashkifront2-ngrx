import { BoardIdNotation } from './boardid-notation';
import { NotationAtomStroke } from './notation-atom-stroke';

export interface NotationStroke {
  count: number;
  first: NotationAtomStroke;
  second?: NotationAtomStroke;
}
