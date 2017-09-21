import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromSearch from './search';
import * as fromArticles from './articles';
import * as fromBoards from './boards';
import * as fromCreateArticle from './create-article';
import * as fromArticleCollection from './article-collection';
import * as fromBoardCollection from './board-collection';
import * as fromRoot from '../../reducers';

export interface ArticlesState {
  createArticle: fromCreateArticle.State;
  search: fromSearch.State;
  articles: fromArticles.State;
  boards: fromBoards.State;
  articleCollection: fromArticleCollection.State;
  boardCollection: fromBoardCollection.State;
}

export interface State extends fromRoot.State {
  articles: ArticlesState;
}

export const reducers = {
  createArticle: fromCreateArticle.reducer,
  search: fromSearch.reducer,
  articles: fromArticles.reducer,
  boards: fromBoards.reducer,
  articleCollection: fromArticleCollection.reducer,
  boardCollection: fromBoardCollection.reducer,
};

/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `articles` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 * 	constructor(state$: Observable<State>) {
 * 	  this.articlesState$ = state$.select(getArticlesState);
 * 	}
 * }
 * ```
 */

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const getArticlesState = createFeatureSelector<ArticlesState>(
  'articles'
);

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memorized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */
export const getArticleEntitiesState = createSelector(
  getArticlesState,
  state => state.articles
);

export const getSelectedBoard = createSelector(
  getArticlesState,
  state => state.boards.selectedBoard
);

export const getSelectedArticleId = createSelector(
  getArticleEntitiesState,
  fromArticles.getSelectedId
);

/**
 * Adapters created with @ngrx/entity generate
 * commonly used selector functions including
 * getting all ids in the record set, a dictionary
 * of the records by id, an array of records and
 * the total number of records. This reducers boilerplate
 * in selecting records from the entity state.
 */
export const {
  selectIds: getArticleIds,
  selectEntities: getArticleEntities,
  selectAll: getAllArticles,
  selectTotal: getTotalArticles,
} = fromArticles.adapter.getSelectors(getArticleEntitiesState);

export const getSelectedArticle = createSelector(
  getArticleEntities,
  getSelectedArticleId,
  (entities, selectedId) => selectedId && entities[selectedId]
);

/**
 * Just like with the articles selectors, we also have to compose the search
 * reducer's and collection reducer's selectors.
 */
export const getSearchState = createSelector(
  getArticlesState,
  (state: ArticlesState) => state.search
);

export const getSearchArticleIds = createSelector(
  getSearchState,
  fromSearch.getIds
);
export const getSearchQuery = createSelector(
  getSearchState,
  fromSearch.getQuery
);
export const getSearchLoading = createSelector(
  getSearchState,
  fromSearch.getLoading
);

/**
 * Some selector functions create joins across parts of state. This selector
 * composes the search result IDs to return an array of articles in the store.
 */
export const getSearchResults = createSelector(
  getArticleEntities,
  getSearchArticleIds,
  (articles, searchIds) => {
    return searchIds.map(id => articles[id]);
  }
);

/**
 * Article Collection
 */

export const getArticleCollectionState = createSelector(
  getArticlesState,
  (state: ArticlesState) => state.articleCollection
);

export const getArticleCollectionLoaded = createSelector(
  getArticleCollectionState,
  fromArticleCollection.getLoaded
);

export const getArticleCollectionLoading = createSelector(
  getArticleCollectionState,
  fromArticleCollection.getLoading
);

export const getCollectionArticleIds = createSelector(
  getArticleCollectionState,
  fromArticleCollection.getIds
);

export const getArticleCollection = createSelector(
  getArticleEntities,
  getCollectionArticleIds,
  (entities, ids) => ids.map(id => entities[id])
);

export const isSelectedArticleInCollection = createSelector(
  getCollectionArticleIds,
  getSelectedArticleId,
  (ids, selected) => {
    return selected == null ? false : ids.indexOf(selected) > -1;
  }
);

/**
 * Board Collection
 */

export const getBoardCollectionState = createSelector(
  getArticlesState,
  (state: ArticlesState) => state.boardCollection
);

export const getCollectionBoardIds = createSelector(
  getBoardCollectionState,
  fromBoardCollection.getIds
);
