import { store } from '../store';
import { Comments } from './comment';
import {
  Guitar,
  Guitars
} from './guitar';

export type Data = {
  guitars: Guitars,
  catalogGuitars?: Guitars,
  searchGuitars?: Guitars,
  currentGuitar: Guitar | null,
  currentGuitarComments: Comments,
  isCommentSent: boolean,
  isDataLoaded: boolean,
  isCatalogLoading?: boolean,
  isSearchLoading?: boolean,
  lastQuery?: string,
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
