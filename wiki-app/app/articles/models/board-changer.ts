import { Draught } from './draught';
import { Square } from './square';

export class BoardChanger {
  squares: Square[];
  wDraughts: Draught[];
  bDraughts: Draught[];
  selectedDraught: Draught;
}
