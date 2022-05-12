import { store } from '../store';
import { Guitars } from './guitar';

export type Data = {
  guitars: Guitars,
  isDataLoaded: boolean,
};


export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
