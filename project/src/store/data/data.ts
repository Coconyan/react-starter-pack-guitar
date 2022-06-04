import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Data } from '../../types/state';

const initialState: Data = {
  guitars: [],
  catalogGuitars: [],
  currentGuitar: null,
  currentGuitarComments: [],
  isCommentSent: false,
  isDataLoaded: false,
  isCatalogLoading: false,
};

export const data = createSlice({
  name: NameSpace.data,
  initialState,
  reducers: {
    loadGuitars: (state, action) => {
      state.guitars = action.payload;
      state.isDataLoaded = true;
    },
    loadCatalogGuitars: (state, action) => {
      state.catalogGuitars = action.payload;
      state.isCatalogLoading = false;
    },
    loadCurrentGuitar: (state, action) => {
      state.currentGuitar = action.payload;
    },
    loadCurrentGuitarComments: (state, action) => {
      state.currentGuitarComments = action.payload;
    },
    setCommentSend: (state, action) => {
      state.isCommentSent = action.payload;
    },
    setIsCatalogLoading: (state, action) => {
      state.isCatalogLoading = action.payload;
    },
  },
});

export const { loadGuitars, loadCatalogGuitars, loadCurrentGuitar, loadCurrentGuitarComments, setCommentSend, setIsCatalogLoading } = data.actions;
