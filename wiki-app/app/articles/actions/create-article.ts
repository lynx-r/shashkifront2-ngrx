import { Action } from '@ngrx/store';
import { Article } from '../models/article';
import { CreateArticleRequest } from '../models/create-article-request';

export const CREATE = '[Create Article] Create';
export const CREATE_SUCCESS = '[Create Article] Success';
export const CREATE_FAIL = '[Create Article] Fail';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handarticle/advanced-types.html#discriminated-unions
 */
export class Create implements Action {
  readonly type = CREATE;

  constructor(public payload: CreateArticleRequest) {}
}

export class CreateSuccess implements Action {
  readonly type = CREATE_SUCCESS;
}

export class CreateFail implements Action {
  readonly type = CREATE_FAIL;
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions = Create | CreateSuccess | CreateFail;
