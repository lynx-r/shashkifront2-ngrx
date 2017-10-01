import { Action } from '@ngrx/store';
import { BoardBox } from '../models/board-box';
import { ArticleCompositeKey } from '../models/article-composite-key';

export const ADD_BOARD = '[BoardBox Collection] Add BoardBox';
export const ADD_BOARD_SUCCESS = '[BoardBox Collection] Add BoardBox Success';
export const ADD_BOARD_FAIL = '[BoardBox Collection] Add BoardBox Fail';
export const REMOVE_BOARD = '[BoardBox Collection] Remove BoardBox';
export const REMOVE_BOARD_SUCCESS =
  '[BoardBox Collection] Remove BoardBox Success';
export const REMOVE_BOARD_FAIL = '[BoardBox Collection] Remove BoardBox Fail';
export const LOAD = '[BoardBox Collection] Load';
export const LOAD_SUCCESS = '[BoardBox Collection] Load Success';
export const LOAD_FAIL = '[BoardBox Collection] Load Fail';

/**
 * Add BoardBox to Collection Actions
 */
export class AddBoard implements Action {
  readonly type = ADD_BOARD;

  constructor(public payload: BoardBox) {}
}

export class AddBoardSuccess implements Action {
  readonly type = ADD_BOARD_SUCCESS;

  constructor(public payload: BoardBox) {}
}

export class AddBoardFail implements Action {
  readonly type = ADD_BOARD_FAIL;

  constructor(public payload: BoardBox) {}
}

/**
 * Remove BoardBox from Collection Actions
 */
export class RemoveBoard implements Action {
  readonly type = REMOVE_BOARD;

  constructor(public payload: BoardBox) {}
}

export class RemoveBoardSuccess implements Action {
  readonly type = REMOVE_BOARD_SUCCESS;

  constructor(public payload: BoardBox) {}
}

export class RemoveBoardFail implements Action {
  readonly type = REMOVE_BOARD_FAIL;

  constructor(public payload: BoardBox) {}
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

  constructor(public payload: BoardBox[]) {}
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
