import { NameSpace } from '../../const';
import { Comments } from '../../types/comment';
import {
  Guitar,
  Guitars
} from '../../types/guitar';
import { State } from '../../types/state';

export const getGuitars = (state: State): Guitars => state[NameSpace.data].guitars;
export const getCatalogGuitars = (state: State): Guitars | undefined => state[NameSpace.data].catalogGuitars;
export const getCurrentGuitar = (state: State): Guitar | null => state[NameSpace.data].currentGuitar;
export const getCurrentGuitarComments = (state: State): Comments => state[NameSpace.data].currentGuitarComments;
export const getCommentSendStatus = (state: State): boolean => state[NameSpace.data].isCommentSent;
export const getDataLoadedStatus = (state: State): boolean => state[NameSpace.data].isDataLoaded;
export const getCatalogLoadingStatus = (state: State): boolean | undefined => state[NameSpace.data].isCatalogLoading;
