import { Rules } from './rules';

export class CreateBoardRequest {
  black: boolean;
  fillBoard: boolean;
  rules: Rules;
  squareSize: number;
}
