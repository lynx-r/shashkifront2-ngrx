import * as square from '../actions/square';
import { Square } from '../models/square';

export interface State {
  square: Square;
}

const initialState: State = {
  square: {
    v: 0,
    h: 0,
  },
};

export function reducer(state = initialState, action: square.Actions): State {
  switch (action.type) {
    case square.CLICK: {
      return {
        ...state,
        square: { ...action.payload },
      };
    }

    default: {
      return state;
    }
  }
}

export const getSquare = (state: State) => state.square;
