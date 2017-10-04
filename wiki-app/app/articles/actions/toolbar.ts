import { Draught } from '../models/draught';
import { Action } from '@ngrx/store';
import { Article } from '../models/article';
import { BoardBox } from '../models/board-box';

export const DRAUGHT_SELECTED = '[Toolbar] Draught selected';
export const PLACE_MODE_TOGGLED = '[Toolbar] Place mode toggled';
export const OPEN_CREATE_ARTICLE_DIALOG =
  '[Toolbar] Open create article dialog';
export const SAVE_ARTICLE = '[Toolbar] Save article';
/**
 * Save board box
 * @type {string}
 */
export const SAVE_BOARD_BOX = '[Toolbar] Save board box';
/**
 * Save and update board in board box
 * @type {string}
 */
export const LOAD_BOARD = '[Toolbar] Update board box';

export class DraughtSelect implements Action {
  readonly type = DRAUGHT_SELECTED;

  constructor(public payload: Draught) {}
}

export class PlaceModeToggle implements Action {
  readonly type = PLACE_MODE_TOGGLED;

  constructor(public payload: string) {}
}

export class OpenCreateArticleDialog implements Action {
  readonly type = OPEN_CREATE_ARTICLE_DIALOG;

  constructor(public payload: boolean) {}
}

export class SaveArticle implements Action {
  readonly type = SAVE_ARTICLE;

  constructor(public payload: Article) {}
}

export class SaveBoardBox implements Action {
  readonly type = SAVE_BOARD_BOX;

  constructor(public payload: BoardBox) {}
}

export class LoadBoard implements Action {
  readonly type = LOAD_BOARD;

  constructor(public payload: BoardBox) {}
}

export type Actions =
  | SaveArticle
  | SaveBoardBox
  | LoadBoard
  | DraughtSelect
  | PlaceModeToggle
  | OpenCreateArticleDialog;
