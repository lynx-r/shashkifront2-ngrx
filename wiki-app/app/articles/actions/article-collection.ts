import { Action } from '@ngrx/store';
import { Article } from '../models/article';

export const ADD_ARTICLE = '[Article Collection] Add Article';
export const ADD_ARTICLE_SUCCESS = '[Article Collection] Add Article Success';
export const ADD_ARTICLE_FAIL = '[Article Collection] Add Article Fail';
export const REMOVE_ARTICLE = '[Article Collection] Remove Article';
export const REMOVE_ARTICLE_SUCCESS =
  '[Article Collection] Remove Article Success';
export const REMOVE_ARTICLE_FAIL = '[Article Collection] Remove Article Fail';
export const LOAD = '[Article Collection] Load';
export const LOAD_SUCCESS = '[Article Collection] Load Success';
export const LOAD_FAIL = '[Article Collection] Load Fail';

/**
 * Add Article to Collection Actions
 */
export class AddArticle implements Action {
  readonly type = ADD_ARTICLE;

  constructor(public payload: Article) {}
}

export class AddArticleSuccess implements Action {
  readonly type = ADD_ARTICLE_SUCCESS;

  constructor(public payload: Article) {}
}

export class AddArticleFail implements Action {
  readonly type = ADD_ARTICLE_FAIL;

  constructor(public payload: Article) {}
}

/**
 * Remove Article from Collection Actions
 */
export class RemoveArticle implements Action {
  readonly type = REMOVE_ARTICLE;

  constructor(public payload: Article) {}
}

export class RemoveArticleSuccess implements Action {
  readonly type = REMOVE_ARTICLE_SUCCESS;

  constructor(public payload: Article) {}
}

export class RemoveArticleFail implements Action {
  readonly type = REMOVE_ARTICLE_FAIL;

  constructor(public payload: Article) {}
}

/**
 * Load Collection Actions
 */
export class Load implements Action {
  readonly type = LOAD;

  constructor(public payload: number = 20) {}
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: Article[]) {}
}

export class LoadFail implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: any) {}
}

export type Actions =
  | AddArticle
  | AddArticleSuccess
  | AddArticleFail
  | RemoveArticle
  | RemoveArticleSuccess
  | RemoveArticleFail
  | Load
  | LoadSuccess
  | LoadFail;
