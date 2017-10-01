import * as _ from 'lodash';

export class Rules {
  public RUSSIAN: number = 0;
  public RUSSIAN_GIVEAWAY: number = 1;
  public INTERNATIONAL: number = 2;
  public INTERNATIONAL_GIVEAWAY: number = 3;

  static getChunk(boardDimension: Array<number>, length: number) {
    return _.chunk(boardDimension, length);
  }

  static getBoardLength(rules: string) {
    return _.range(Rules.getDimension(rules) * Rules.getDimension(rules));
  }

  static getAllBoardLength(dimesnion: number) {
    return _.range(dimesnion * dimesnion);
  }

  static getBoardSize(rules: string) {
    return _.range(Rules.getDimension(rules));
  }

  static getDimension(rules: string): number {
    switch (rules) {
      case 'RUSSIAN':
      case 'RUSSIAN_GIVEAWAY':
        return 8;
      case 'INTERNATIONAL':
      case 'INTERNATIONAL_GIVEAWAY':
        return 10;
      default:
        return 8;
    }
  }
}
