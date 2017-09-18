import { Action } from '@ngrx/store';
import { Board } from '../models/board';
import { CreateBoardRequest } from '../models/create-board-request';
import { CreateArticleRequest } from '../models/create-article-request';

export const LOAD = '[Board] Load';
export const EDIT = '[Board] Edit';
export const CREATE_SUCCESS = '[Board] Success';
export const CREATE_FAIL = '[Board] Fail';

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

export class CreateFail implements Action {
  readonly type = CREATE_FAIL;

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

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions = CreateSuccess | Edit | Load;
