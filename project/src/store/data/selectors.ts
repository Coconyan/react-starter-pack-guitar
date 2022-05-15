import { NameSpace } from '../../const';
import {
  Guitar,
  Guitars
} from '../../types/guitar';
import { State } from '../../types/state';

export const getGuitars = (state: State): Guitars => state[NameSpace.data].guitars;
export const getCurrentGuitar = (state: State): Guitar | null => state[NameSpace.data].currentGuitar;
export const getDataLoadedStatus = (state: State): boolean => state[NameSpace.data].isDataLoaded;
