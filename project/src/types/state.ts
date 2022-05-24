import { store } from '../store';
import { Comments } from './comment';
import { Guitar, Guitars } from './guitar';

export type Data = {
  guitars: Guitars,
  currentGuitar: Guitar | null,
  currentGuitarComments: Comments,
  // guitarsComments: Comments[], todo
  isCommentSent: boolean,
  isDataLoaded: boolean,
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
