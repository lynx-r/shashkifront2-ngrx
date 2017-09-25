import { Action } from '@ngrx/store';
import { Square } from '../models/square';

export const CLICK = '[Square] Click';
export const LOAD_SUCCESS = '[Square] Load Success';
export const SELECT = '[Square] Select';
export const EDIT = '[Square] Edit';
export const CREATE_SUCCESS = '[Square] Success';
export const LOAD_FAIL = '[Square] Fail';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handsquare/advanced-types.html#discriminated-unions
 */
export class CreateSuccess implements Action {
  readonly type = CREATE_SUCCESS;

  constructor(public payload: Square) {}
}

export class Edit implements Action {
  readonly type = EDIT;

  constructor(public payload: Square) {}
}

export class Click implements Action {
  readonly type = CLICK;

  constructor(public payload: Square) {}
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: Square) {}
}

export class LoadFail implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: Square) {}
}

export class Select implements Action {
  readonly type = SELECT;

  constructor(public payload: string) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions =
  | Click
  | CreateSuccess
  | Edit
  | LoadSuccess
  | LoadFail
  | Select;
