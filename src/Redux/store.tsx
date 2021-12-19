import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { AuthorMeta } from '../typesDef';

type RootState = {
  authorMeta: AuthorMeta | null;
}

enum ActionTypes {
  SET_AUTHOR_META = 'SET_AUTHOR_META'
}

type SetAuthorMeta = {
  type: ActionTypes.SET_AUTHOR_META;
  authorMeta: AuthorMeta;
};

type Actions = SetAuthorMeta;

const initialState: RootState = {
  authorMeta: null,
};

export const setAuthorMeta = (authorMeta: AuthorMeta): SetAuthorMeta => ({
  type: ActionTypes.SET_AUTHOR_META, authorMeta,
});

export const stateAuthorMeta = (state: RootState): AuthorMeta | null => state.authorMeta;

const rootReducer = (state = initialState, action: Actions): RootState => {
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

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
