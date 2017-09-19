import { Action } from '@ngrx/store';
import { Board } from '../models/board';
import { ArticleCompositeKey } from '../models/article-composite-key';

export const ADD_BOARD = '[Board Collection] Add Board';
export const ADD_BOARD_SUCCESS = '[Board Collection] Add Board Success';
export const ADD_BOARD_FAIL = '[Board Collection] Add Board Fail';
export const REMOVE_BOARD = '[Board Collection] Remove Board';
export const REMOVE_BOARD_SUCCESS = '[Board Collection] Remove Board Success';
export const REMOVE_BOARD_FAIL = '[Board Collection] Remove Board Fail';
export const LOAD = '[Board Collection] Load';
export const LOAD_SUCCESS = '[Board Collection] Load Success';
export const LOAD_FAIL = '[Board Collection] Load Fail';

/**
 * Add Board to Collection Actions
 */
export class AddBoard implements Action {
  readonly type = ADD_BOARD;

  constructor(public payload: Board) {}
}

export class AddBoardSuccess implements Action {
  readonly type = ADD_BOARD_SUCCESS;

  constructor(public payload: Board) {}
}

export class AddBoardFail implements Action {
  readonly type = ADD_BOARD_FAIL;

  constructor(public payload: Board) {}
}

/**
 * Remove Board from Collection Actions
 */
export class RemoveBoard implements Action {
  readonly type = REMOVE_BOARD;

  constructor(public payload: Board) {}
}

export class RemoveBoardSuccess implements Action {
  readonly type = REMOVE_BOARD_SUCCESS;

  constructor(public payload: Board) {}
}

export class RemoveBoardFail implements Action {
  readonly type = REMOVE_BOARD_FAIL;

  constructor(public payload: Board) {}
}

/**
 * Load Collection Actions
 */
export class Load implements Action {
  readonly type = LOAD;

  constructor(public payload: string[]) {}
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: Board[]) {}
}

export class LoadFail implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: any) {}
}

export type Actions =
  | AddBoard
  | AddBoardSuccess
  | AddBoardFail
  | RemoveBoard
  | RemoveBoardSuccess
  | RemoveBoardFail
  | Load
  | LoadSuccess
  | LoadFail;
