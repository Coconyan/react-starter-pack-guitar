import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Data } from '../../types/state';

const initialState: Data = {
  guitars: [],
  currentGuitar: null,
  currentGuitarComments: [],
  guitarsComments: [],
  isCommentSent: false,
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
    loadCurrentGuitarComments: (state, action) => {
      state.currentGuitarComments = action.payload;
    },
    loadGuitarsComments: (state, action) => {
      state.guitarsComments.push(action.payload);
    },
    setGuitarsComments: (state, action) => {
      state.guitarsComments = (action.payload);
    },
    setCommentSend: (state, action) => {
      state.isCommentSent = (action.payload);
    },
  },
});

export const { loadGuitars, loadCurrentGuitar, loadCurrentGuitarComments, loadGuitarsComments, setGuitarsComments, setCommentSend } = data.actions;
