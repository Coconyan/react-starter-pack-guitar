import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Cart } from '../../types/state';

const initialState: Cart = {
  cartGuitars: [],
};

export const cart = createSlice({
  name: NameSpace.cart,
  initialState,
  reducers: {
    loadCartGuitars: (state, action) => {
      state.cartGuitars = action.payload;
    },
  },
});

export const { loadCartGuitars } = cart.actions;
