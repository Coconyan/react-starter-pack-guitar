import { NameSpace, PromoCode } from '../../const';
import {
  Guitars
} from '../../types/guitar';
import { State } from '../../types/state';

export const getCartGuitars = (state: State): Guitars => state[NameSpace.cart].cartGuitars;
export const getPromoCode = (state: State): PromoCode | null => state[NameSpace.cart].promoCode;
