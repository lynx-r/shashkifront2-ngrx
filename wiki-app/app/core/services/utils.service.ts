import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Square } from '../../articles/models/square';
import { AppConstants } from './app-constants';
import { BoardIdNotation } from '../../articles/models/boardid-notation';

@Injectable()
export class Utils {
  constructor() {}

  public static randomString(length: number = 5): string {
    return Math.random().toString(36).substring(2, 2 + length);
  }

  static handleError(error: any) {
    console.log(error);
    Observable.throw(error.message);
  }

  static getModeColor(mode: string) {
    switch (mode) {
      case AppConstants.PLACE_MODE:
        return '#ffb3a4';
      case AppConstants.WRITE_MODE:
        return '#add8ff';
      default:
        return 'white';
    }
  }

  static handleResponse(resp: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (resp.ok) {
        resolve(resp);
      } else {
        Utils.handleError(resp);
        reject(resp.comment);
      }
    });
  }

  static processRequest(resp: any) {
    console.log('RESPONSE ', resp);
    if (resp.ok) {
      return resp.json();
    }
    throw { message: resp.message };
  }

  static equalsSquares(source: Square, target: Square) {
    return source.v == target.v && source.h == target.h;
  }

  static containsSquare(list: Square[], target: Square) {
    let find = list.find(p => Utils.equalsSquares(p, target));
    if (find) {
      console.log('found', target);
    }
    return find != null;
  }

  static getNotation(boards: BoardIdNotation[]): string[] {
    if (!boards) return [];
    let strings = boards.map(boardIdNotation => boardIdNotation.notation);
    console.log('BOARDS NOTATION', strings);
    return strings;
  }
}
