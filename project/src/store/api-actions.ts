import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';
import { Guitars } from '../types/guitar';
import {
  AppDispatch,
  State
} from '../types/state';
import { loadCurrentGuitar, loadGuitars } from './data/data';

export const fetchGuitarsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchGuitars',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Guitars>(`${APIRoute.Guitars}?_limit=27`);
      dispatch(loadGuitars(data));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      // todo errorHandle(error);
    }
  },
);

export const fetchCurrentGuitarAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchCurrentGuitar',
  async (id: number, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Guitars>(`${APIRoute.Guitars}/${id}`);
      dispatch(loadCurrentGuitar(data));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      // todo errorHandle(error);
    }
  },
);
