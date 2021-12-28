import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { AuthorMeta } from '../typesDef';
// eslint-disable-next-line import/no-cycle
import { rootReducer } from './reducers';

export type RootState = {
  authorMeta: AuthorMeta | null;
}

export const initialState: RootState = {
  authorMeta: null,
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
