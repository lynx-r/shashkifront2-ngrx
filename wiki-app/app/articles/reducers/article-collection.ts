import * as articleCollection from '../actions/article-collection';

export interface State {
  loaded: boolean;
  loading: boolean;
  ids: string[];
}

const initialState: State = {
  loaded: false,
  loading: false,
  ids: [],
};

export function reducer(
  state = initialState,
  action: articleCollection.Actions
): State {
  switch (action.type) {
    case articleCollection.LOAD: {
      return {
        ...state,
        loading: true,
      };
    }

    case articleCollection.LOAD_SUCCESS: {
      console.log('****', action);
      return {
        ...state,
        loaded: true,
        loading: false,
        ids: (<any>action.payload).map((article: any) => article.id),
      };
    }

    case articleCollection.ADD_ARTICLE_SUCCESS:
    case articleCollection.REMOVE_ARTICLE_FAIL: {
      if (state.ids.indexOf(action.payload.id) > -1) {
        return state;
      }

      return {
        ...state,
        ids: [...state.ids, action.payload.id],
      };
    }

    case articleCollection.REMOVE_ARTICLE_SUCCESS:
    case articleCollection.ADD_ARTICLE_FAIL: {
      return {
        ...state,
        ids: state.ids.filter(id => id !== action.payload.id),
      };
    }

    default: {
      return state;
    }
  }
}

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getIds = (state: State) => state.ids;
