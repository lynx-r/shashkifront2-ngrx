import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as board from '../actions/board';
import * as square from '../actions/square';
import * as boardCollection from '../actions/board-collection';
import { Board } from '../models/board';
import { Square } from '../models/square';

/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is extended to include
 * any additional interface properties.
 */
export interface State extends EntityState<Board> {
  selectedBoardId: string | null;
  selectedSquare: Square | null;
}

/**
 * createEntityAdapter creates many an object of helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record id selector function and
 * a sort option whether to sort the records when performing
 * operations
 */
export const adapter: EntityAdapter<Board> = createEntityAdapter<Board>({
  selectId: (board: Board) => board.id,
  sort: false,
});

/** getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialState: State = adapter.getInitialState({
  selectedBoardId: null,
  selectedSquare: null,
});

export function reducer(
  state = initialState,
  action: board.Actions | boardCollection.Actions | square.Actions
): State {
  switch (action.type) {
    case boardCollection.LOAD_SUCCESS: {
      return {
        ...adapter.addMany(action.payload, state),
      };
    }

    case board.LOAD: {
      let s = {
        ...adapter.addOne(action.payload, state),
        selectedBoardId: action.payload.id,
      };
      console.log('RELOAD', s);
      // return {
      //   ...adapter.addOne(action.payload,state),
      //   selectedBoardId: action.payload.id
      // }
      let entities = {};
      entities[action.payload.id] = { ...action.payload };
      return {
        ...state,
        ids: [action.payload.id],
        entities: entities,
        selectedBoardId: action.payload.id,
      };
    }

    case board.CLICK: {
      return {
        ...adapter.addOne(action.payload, state),
        selectedBoardId: action.payload.id,
        selectedSquare: action.payload.selectedSquare,
      };
    }

    case board.SELECT: {
      return {
        ...state,
        selectedBoardId: action.payload,
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

export const getSelectedId = (state: State) => state.selectedBoardId;
