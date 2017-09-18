import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Square } from '../../articles/models/square';

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
    console.log(resp.ok);
    let body = resp.json();
    console.log(body);
    if (resp.ok) {
      return body.data;
    }
    console.log('err');
    throw { message: body.message };
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
}
