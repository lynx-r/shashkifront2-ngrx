import { Draught } from '../models/draught';
import { Action } from '@ngrx/store';

export const DRAUGHT_SELECTED = '[Toolbar] Draught selected';
export const PLACE_MODE_TOGGLED = '[Toolbar] Place mode toggled';

export class DraughtSelected implements Action {
  readonly type = DRAUGHT_SELECTED;

  constructor(public payload: Draught) {}
}

export class PlaceModeToggled implements Action {
  readonly type = PLACE_MODE_TOGGLED;

  constructor(public payload: string) {}
}

export type Actions = DraughtSelected | PlaceModeToggled;
