import { makeFakeGuitar } from '../../mocks/fake-guitar';
import {
  cart,
  loadCartGuitars,
  setPromoCode
} from './cart';

const guitars = [makeFakeGuitar(), makeFakeGuitar(), makeFakeGuitar()];
const promoCode = 'promo';
const state = {
  cartGuitars: [],
  promoCode: null,
};

describe('Reducer: cart', () => {
  it('without additional parameters should return initial state', () => {
    expect(cart.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        cartGuitars: [],
        promoCode: null,
      });
  });

  it('should update guitars by load guitars', () => {
    expect(cart.reducer(state, loadCartGuitars(guitars)))
      .toEqual({
        cartGuitars: guitars,
        promoCode: null,
      });
  });

  it('should update promoCode by load promoCode', () => {
    expect(cart.reducer(state, setPromoCode(promoCode)))
      .toEqual({
        cartGuitars: [],
        promoCode: promoCode,
      });
  });
});
