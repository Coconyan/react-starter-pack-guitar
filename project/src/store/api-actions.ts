import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';
import { errorHandle } from '../services/error-handle';
import {
  CommentPost,
  Comments
} from '../types/comment';
import {
  Guitar,
  Guitars
} from '../types/guitar';
import {
  AppDispatch,
  State
} from '../types/state';
import {
  loadCurrentGuitar,
  loadCurrentGuitarComments,
  loadGuitars,
  loadGuitarsComments,
  setCommentSend
} from './data/data';

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
      errorHandle(error);
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
      const { data } = await api.get<Guitar>(`${APIRoute.Guitars}/${id}`);
      dispatch(loadCurrentGuitar(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchCurrentGuitarCommentsAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchCurrentGuitarComments',
  async (id: number, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Comments>(`${APIRoute.Guitars}/${id}${APIRoute.Comments}`);
      dispatch(loadCurrentGuitarComments(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchCurrentGuitarCommentsCardAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchCurrentGuitarCommentsCard',
  async (id: number, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Comments>(`${APIRoute.Guitars}/${id}${APIRoute.Comments}`);
      dispatch(loadGuitarsComments(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const addNewCommentAction = createAsyncThunk<void, CommentPost, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/addNewComment',
  async ({ guitarId, userName, rating, advantage, disadvantage, comment }: CommentPost, { dispatch, extra: api }) => {
    try {
      await api.post<CommentPost>(APIRoute.Comments, { guitarId, userName, rating, advantage, disadvantage, comment });
      dispatch(setCommentSend(true));
    } catch (error) {
      errorHandle(error);
    }
  },
);
