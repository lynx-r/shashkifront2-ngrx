import * as boardCollection from '../actions/board-collection';

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
  action: boardCollection.Actions
): State {
  switch (action.type) {
    case boardCollection.LOAD: {
      return {
        ...state,
        loading: true,
      };
    }

    case boardCollection.LOAD_SUCCESS: {
      console.log('****', action);
      return {
        ...state,
        loaded: true,
        loading: false,
        ids: action.payload.map(board => board.id),
      };
    }

    case boardCollection.ADD_BOARD_SUCCESS:
    case boardCollection.REMOVE_BOARD_FAIL: {
      if (state.ids.indexOf(action.payload.id) > -1) {
        return state;
      }

      return {
        ...state,
        ids: [...state.ids, action.payload.id],
      };
    }

    case boardCollection.REMOVE_BOARD_SUCCESS:
    case boardCollection.ADD_BOARD_FAIL: {
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
