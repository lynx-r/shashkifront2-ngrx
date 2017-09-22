import { Action } from '@ngrx/store';
import { BoardBox } from '../models/board-box';

export const LOAD = '[BoardBox] Load';
export const LOAD_SUCCESS = '[BoardBox] Load Success';
export const SELECT = '[BoardBox] Select';
export const CLICK = '[BoardBox] Click';
export const ADD_DRAUGHT = '[BoardBox] Add draught';
export const MOVE = '[BoardBox] Move';
export const EDIT = '[BoardBox] Edit';
export const CREATE_SUCCESS = '[BoardBox] Success';
export const LOAD_FAIL = '[BoardBox] Fail';
export const MODE = '[BoardBox] Mode';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handboard/advanced-types.html#discriminated-unions
 */
export class CreateSuccess implements Action {
  readonly type = CREATE_SUCCESS;

  constructor(public payload: BoardBox) {}
}

export class Edit implements Action {
  readonly type = EDIT;

  constructor(public payload: BoardBox) {}
}

export class Load implements Action {
  readonly type = LOAD;

  constructor(public payload: BoardBox) {}
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: BoardBox) {}
}

export class LoadFail implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: BoardBox) {}
}

export class Select implements Action {
  readonly type = SELECT;

  constructor(public payload: string) {}
}

export class Click implements Action {
  readonly type = CLICK;

  constructor(public payload: BoardBox) {}
}

export class AddDraught implements Action {
  readonly type = ADD_DRAUGHT;

  constructor(public payload: BoardBox) {}
}

export class Move implements Action {
  readonly type = MOVE;

  constructor(public payload: BoardBox) {}
}

export class Mode implements Action {
  readonly type = MODE;

  constructor(public payload: string) {}
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions =
  | CreateSuccess
  | Edit
  | Load
  | LoadSuccess
  | LoadFail
  | Select
  | Click
  | Move
  | Mode;
