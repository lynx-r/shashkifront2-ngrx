import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as createArticle from '../actions/create-article';
import { CreateArticleRequest } from '../models/create-article-request';

/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is extended to include
 * any additional interface properties.
 */
export interface State extends EntityState<CreateArticleRequest> {
  selectedArticleId: string | null;
  loading: boolean;
  loaded: boolean;
}

/**
 * createEntityAdapter creates many an object of helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record id selector function and
 * a sort option whether to sort the records when performing
 * operations
 */
export const adapter: EntityAdapter<CreateArticleRequest> = createEntityAdapter<
  CreateArticleRequest
>({
  selectId: (article: CreateArticleRequest) => article.article.id,
});

/** getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
*/
export const initialState: State = adapter.getInitialState({
  selectedArticleId: null,
  loading: false,
  loaded: false,
});

export function reducer(
  state = initialState,
  action: createArticle.Actions
): State {
  switch (action.type) {
    case createArticle.CREATE: {
      return {
        ...state,
        loading: true,
      };
    }

    case createArticle.CREATE_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    }

    default: {
      return state;
    }
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const getSelectedId = (state: State) => state.selectedArticleId;
