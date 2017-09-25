import { Draught } from './draught';
export interface Square {
  v: number;
  h: number;
  main?: boolean;
  highlighted?: boolean;
  occupied?: boolean;
  draught?: Draught;
  size?: number;
  notation?: string;
}
