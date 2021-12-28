import { RootState } from './store';
import { AuthorMeta } from '../typesDef';

export const stateAuthorMeta = (state: RootState): AuthorMeta | null => state.authorMeta;
