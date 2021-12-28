// eslint-disable-next-line import/no-cycle
import { initialState, RootState } from './store';
import { Actions, ActionTypes } from './actions';

export const rootReducer = (state = initialState, action: Actions): RootState => {
  switch (action.type) {
    case ActionTypes.SET_AUTHOR_META:
      return {
        ...state,
        authorMeta: { ...action.authorMeta },
      };

    default:
      return state;
  }
};
