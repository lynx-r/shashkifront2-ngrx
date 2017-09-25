import * as toolbar from '../actions/toolbar';
import { Draught } from '../models/draught';
import { AppConstants } from '../../core/services/app-constants';

export interface State {
  draught: Draught;
  placeMode: string;
  openCreateArticleDialog: boolean;
}

let initDraught = {
  black: false,
  queen: false,
  beaten: false,
};

const initialState: State = {
  draught: initDraught,
  placeMode: AppConstants.WRITE_MODE,
  openCreateArticleDialog: false,
};

export function reducer(state = initialState, action: toolbar.Actions): State {
  switch (action.type) {
    case toolbar.DRAUGHT_SELECTED: {
      return {
        ...state,
        draught: { ...action.payload },
      };
    }

    case toolbar.PLACE_MODE_TOGGLED: {
      return {
        ...state,
        placeMode: action.payload,
      };
    }

    case toolbar.OPEN_CREATE_ARTICLE_DIALOG: {
      return {
        ...state,
        openCreateArticleDialog: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export const getDraught = (state: State) => state.draught;
export const getBoardMode = (state: State) => state.placeMode;
export const getCreateArticleDialog = (state: State) =>
  state.openCreateArticleDialog;
