import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as article from '../actions/article';
import * as collection from '../actions/collection';
import { Article } from '../models/article';

/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is extended to include
 * any additional interface properties.
 */
export interface State extends EntityState<Article> {
  selectedArticleId: string | null;
}

/**
 * createEntityAdapter creates many an object of helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record id selector function and
 * a sort option whether to sort the records when performing
 * operations
 */
export const adapter: EntityAdapter<Article> = createEntityAdapter<Article>({
  selectId: (article: Article) => {
    console.log(article);
    return article.id;
  },
  sort: false,
});

/** getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
*/
export const initialState: State = adapter.getInitialState({
  selectedArticleId: null,
});

export function reducer(
  state = initialState,
  action: article.Actions | collection.Actions
): State {
  switch (action.type) {
    case collection.LOAD_SUCCESS: {
      return {
        /**
         * The addOne function provided by the created adapter
         * adds one record to the entity dictionary
         * and returns a new state including that records if it doesn't
         * exist already. If the collection is to be sorted, the adapter will
         * insert the new record into the sorted array.
         */
        ...adapter.addMany(action.payload, state),
        selectedArticleId: state.selectedArticleId,
      };
    }

    case article.LOAD: {
      return {
        ...state,
        selectedArticleId: action.payload,
      };
    }

    case article.LOAD_SUCCESS: {
      return {
        ...adapter.addOne(action.payload, state),
        selectedArticleId: action.payload.id,
      };
    }

    case article.SELECT: {
      return {
        ...state,
        selectedArticleId: action.payload,
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
