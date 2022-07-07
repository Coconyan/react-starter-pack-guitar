import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Cart } from '../../types/state';

const initialState: Cart = {
  cartGuitars: [],
  promoCode: null,
};

export const cart = createSlice({
  name: NameSpace.cart,
  initialState,
  reducers: {
    loadCartGuitars: (state, action) => {
      state.cartGuitars = action.payload;
    },
    setPromoCode: (state, action) => {
      state.promoCode = action.payload;
    },
  },
});

export const { loadCartGuitars, setPromoCode } = cart.actions;
