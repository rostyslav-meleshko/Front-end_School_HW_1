import { AuthorMeta } from '../typesDef';

export enum ActionTypes {
  SET_AUTHOR_META = 'SET_AUTHOR_META'
}

type SetAuthorMeta = {
  type: ActionTypes.SET_AUTHOR_META;
  authorMeta: AuthorMeta;
};

export type Actions = SetAuthorMeta;

export const setAuthorMeta = (authorMeta: AuthorMeta): SetAuthorMeta => ({
  type: ActionTypes.SET_AUTHOR_META, authorMeta,
});
