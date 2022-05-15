import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Data } from '../../types/state';

const initialState: Data = {
  guitars: [],
  currentGuitar: null,
  isDataLoaded: false,
};

export const data = createSlice({
  name: NameSpace.data,
  initialState,
  reducers: {
    loadGuitars: (state, action) => {
      state.guitars = action.payload;
      state.isDataLoaded = true;
    },
    loadCurrentGuitar: (state, action) => {
      state.currentGuitar = action.payload;
    },
  },
});

export const { loadGuitars, loadCurrentGuitar } = data.actions;
