import { Draught } from '../models/draught';
import { Action } from '@ngrx/store';

export const DRAUGHT_SELECTED = '[Toolbar] Draught selected';
export const PLACE_MODE_TOGGLED = '[Toolbar] Place mode toggled';
export const OPEN_CREATE_ARTICLE_DIALOG =
  '[Toolbar] Open create article dialog';

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

export type Actions = DraughtSelect | PlaceModeToggle | OpenCreateArticleDialog;
