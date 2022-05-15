import { store } from '../store';
import { Guitar, Guitars } from './guitar';

export type Data = {
  guitars: Guitars,
  currentGuitar: Guitar | null
  isDataLoaded: boolean,
};


export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
