import * as _ from 'lodash';

export class Rules {
  static RUSSIAN: number = 8;
  static RUSSIAN_GIVEAWAY: number = -8;
  static INTERNATIONAL: number = 10;
  static INTERNATIONAL_GIVEAWAY: number = -10;

  static getChunk(boardDimension: Array<number>, length: number) {
    return _.chunk(boardDimension, length);
  }

  static getBoardLenth(rules: string) {
    return _.range(
      Math.abs(Rules.getDimension(rules) * Rules.getDimension(rules))
    );
  }

  static getDimension(rules: string): number {
    return Rules[rules];
  }

  static serialize(rules: Rules): number {
    switch (rules) {
      case Rules.RUSSIAN:
        return 0;
      case Rules.RUSSIAN_GIVEAWAY:
        return 1;
      case Rules.INTERNATIONAL:
        return 2;
      case Rules.INTERNATIONAL_GIVEAWAY:
        return 3;
      default:
        return 0;
    }
  }
}
