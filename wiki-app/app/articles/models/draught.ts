export interface Draught {
  black: boolean;
  queen: boolean;
  captured: boolean;
  markCaptured: boolean;
  v?: number;
  h?: number;
  highlighted?: boolean;
}
