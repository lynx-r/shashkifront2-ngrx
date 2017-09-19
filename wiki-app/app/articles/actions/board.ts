import { Action } from '@ngrx/store';
import { Board } from '../models/board';

export const LOAD = '[Board] Load';
export const LOAD_SUCCESS = '[Board] Load Success';
export const SELECT = '[Board] Select';
export const EDIT = '[Board] Edit';
export const CREATE_SUCCESS = '[Board] Success';
export const LOAD_FAIL = '[Board] Fail';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handboard/advanced-types.html#discriminated-unions
 */
export class CreateSuccess implements Action {
  readonly type = CREATE_SUCCESS;

  constructor(public payload: Board) {}
}

export class Edit implements Action {
  readonly type = EDIT;

  constructor(public payload: Board) {}
}

export class Load implements Action {
  readonly type = LOAD;

  constructor(public payload: Board) {}
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: Board) {}
}

export class LoadFail implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: Board) {}
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
  | CreateSuccess
  | Edit
  | Load
  | LoadSuccess
  | LoadFail
  | Select;
