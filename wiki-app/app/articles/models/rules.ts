// import * as _ from 'lodash';

export class Rules {
  static RUSSIAN: number = 0;
  static RUSSIAN_GIVEAWAY: number = 1;
  static INTERNATIONAL: number = 2;
  static INTERNATIONAL_GIVEAWAY: number = 3;

  // static getChunk(boardDimension: Array<number>, length: number) {
  //   return _.chunk(boardDimension, length);
  // }

  // static getBoardLenth(rules: string) {
  //   return _.range(
  //     Math.abs(Rules.getDimension(rules) * Rules.getDimension(rules))
  //   );
  // }

  static getDimension(rules: Rules): number {
    switch (rules) {
      case Rules.RUSSIAN:
        return 8;
      case Rules.RUSSIAN_GIVEAWAY:
        return -8;
      case Rules.INTERNATIONAL:
        return 10;
      case Rules.INTERNATIONAL_GIVEAWAY:
        return -10;
      default:
        return 8;
    }
  }
}
