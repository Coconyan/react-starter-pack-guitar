import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Data } from '../../types/state';

const initialState: Data = {
  guitars: [],
  catalogGuitars: [],
  searchGuitars: [],
  currentGuitar: null,
  currentGuitarComments: [],
  isCommentSent: false,
  isDataLoaded: false,
  isCatalogLoading: false,
  isSearchLoading: false,
  lastQuery: '',
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
    loadSearchGuitars: (state, action) => {
      state.searchGuitars = action.payload;
      state.isSearchLoading = false;
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
    setLastQuery: (state, action) => {
      state.lastQuery = action.payload;
    },
    setIsSearchLoading: (state, action) => {
      state.isSearchLoading = action.payload;
    },
  },
});

export const { loadGuitars, loadCatalogGuitars, loadSearchGuitars, loadCurrentGuitar, loadCurrentGuitarComments, setCommentSend, setIsCatalogLoading, setLastQuery, setIsSearchLoading } = data.actions;
