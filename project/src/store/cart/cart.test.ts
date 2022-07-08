import { makeFakeGuitar } from '../../mocks/fake-guitar';
import {
  cart,
  loadCartGuitars,
  setDiscount,
  setPromoCode
} from './cart';

const guitars = [makeFakeGuitar(), makeFakeGuitar(), makeFakeGuitar()];
const promoCode = 'promo';
const discount = 15;
const state = {
  cartGuitars: [],
  promoCode: null,
  discount: 0,
};

describe('Reducer: cart', () => {
  it('without additional parameters should return initial state', () => {
    expect(cart.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        cartGuitars: [],
        promoCode: null,
        discount: 0,
      });
  });

  it('should update guitars by load guitars', () => {
    expect(cart.reducer(state, loadCartGuitars(guitars)))
      .toEqual({
        cartGuitars: guitars,
        promoCode: null,
        discount: 0,
      });
  });

  it('should update promoCode by load promoCode', () => {
    expect(cart.reducer(state, setPromoCode(promoCode)))
      .toEqual({
        cartGuitars: [],
        promoCode: promoCode,
        discount: 0,
      });
  });

  it('should update discount by setDiscount', () => {
    expect(cart.reducer(state, setDiscount(discount)))
      .toEqual({
        cartGuitars: [],
        promoCode: null,
        discount: discount,
      });
  });
});
