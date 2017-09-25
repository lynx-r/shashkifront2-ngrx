export interface Draught {
  black: boolean;
  queen: boolean;
  beaten: boolean;
  v?: number;
  h?: number;
  highlighted?: boolean;
}
