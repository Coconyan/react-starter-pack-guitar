import { NameSpace } from '../../const';
import {
  Guitars
} from '../../types/guitar';
import { State } from '../../types/state';

export const getCartGuitars = (state: State): Guitars => state[NameSpace.cart].cartGuitars;
