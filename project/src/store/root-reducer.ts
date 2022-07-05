import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { cart } from './data copy/cart';
import { data } from './data/data';

export const rootReducer = combineReducers({
  [NameSpace.data]: data.reducer,
  [NameSpace.cart]: cart.reducer,
});
