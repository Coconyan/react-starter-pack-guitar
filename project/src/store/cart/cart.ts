import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Cart } from '../../types/state';

const initialState: Cart = {
  cartGuitars: [],
  promoCode: null,
  discount: 0,
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
    setDiscount: (state, action) => {
      state.discount = action.payload;
    },
  },
});

export const { loadCartGuitars, setPromoCode, setDiscount } = cart.actions;
