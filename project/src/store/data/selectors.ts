import { NameSpace } from '../../const';
import { Guitars } from '../../types/guitar';
import { State } from '../../types/state';

export const getGuitars = (state: State): Guitars => state[NameSpace.data].guitars;
export const getDataLoadedStatus = (state: State): boolean => state[NameSpace.data].isDataLoaded;
