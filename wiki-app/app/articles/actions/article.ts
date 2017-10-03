import { Action } from '@ngrx/store';
import { Article } from '../models/article';

export const SEARCH = '[Article] Search';
export const SEARCH_COMPLETE = '[Article] Search Complete';
export const LOAD = '[Article] Load';
export const LOAD_SUCCESS = '[Article] Load Success';
export const LOAD_FAIL = '[Article] Load Fail';
export const UPDATE = '[Article] Update';
export const EDIT = '[Article] Edit';
export const CREATE_SUCCESS = '[Article] Success';
export const SELECT = '[Article] Select';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handarticle/advanced-types.html#discriminated-unions
 */
export class Search implements Action {
  readonly type = SEARCH;

  constructor(public payload: string) {}
}

export class SearchComplete implements Action {
  readonly type = SEARCH_COMPLETE;

  constructor(public payload: Article[]) {}
}

export class CreateSuccess implements Action {
  readonly type = CREATE_SUCCESS;

  constructor(public payload: Article) {}
}

export class Edit implements Action {
  readonly type = EDIT;

  constructor(public payload: Article) {}
}

export class Load implements Action {
  readonly type = LOAD;

  constructor(public payload: Article) {}
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: Article) {}
}

export class LoadFail implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: any) {}
}

export class Update implements Action {
  readonly type = UPDATE;

  constructor(public payload: Article) {}
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
  | Search
  | SearchComplete
  | CreateSuccess
  | Edit
  | Load
  | LoadSuccess
  | Update
  | Select;
