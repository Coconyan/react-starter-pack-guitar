import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import { APIRoute, PromoCode } from '../const';
import { State } from '../types/state';
import { makeFakeGuitar } from '../mocks/fake-guitar';
import {
  addNewCommentAction,
  fetchCurrentGuitarAction,
  fetchCurrentGuitarCommentsAction,
  fetchGuitarsAction,
  fetchGuitarsCatalogAction,
  fetchGuitarsSearchAction,
  fetchPromoCodeDiscount
} from './api-actions';
import {
  loadCatalogGuitars,
  loadCurrentGuitar,
  loadCurrentGuitarComments,
  loadGuitars,
  loadSearchGuitars,
  setCommentSend
} from './data/data';
import { makeFakeComment } from '../mocks/fake-comment';
import { setDiscount } from './cart/cart';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should dispatch Load Guitars when GET /guitars', async () => {
    const mockGuitars = [makeFakeGuitar(), makeFakeGuitar()];
    mockAPI
      .onGet(`${APIRoute.Guitars}?_limit=27&_embed=comments`)
      .reply(200, mockGuitars);

    const store = mockStore();

    await store.dispatch(fetchGuitarsAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadGuitars.toString());
  });

  it('should dispatch Load catalog Guitars when GET /guitars', async () => {
    const mockGuitars = [makeFakeGuitar(), makeFakeGuitar()];
    mockAPI
      .onGet(`${APIRoute.Guitars}?_limit=27&_embed=comments`)
      .reply(200, mockGuitars);

    const store = mockStore();

    await store.dispatch(fetchGuitarsCatalogAction(''));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadCatalogGuitars.toString());
  });

  it('should dispatch search Guitars when GET /guitars?name_like=', async () => {
    const mockGuitars = [makeFakeGuitar(), makeFakeGuitar()];
    mockAPI
      .onGet(`${APIRoute.Guitars}?name_like=`)
      .reply(200, mockGuitars);

    const store = mockStore();

    await store.dispatch(fetchGuitarsSearchAction(''));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadSearchGuitars.toString());
  });

  it('should dispatch Load Guitars when GET /guitars/id', async () => {
    const mockGuitar = makeFakeGuitar();
    mockAPI
      .onGet(`${APIRoute.Guitars}/1`)
      .reply(200, mockGuitar);

    const store = mockStore();

    await store.dispatch(fetchCurrentGuitarAction(1));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadCurrentGuitar.toString());
  });

  it('should dispatch Load Current Guitar Comments when GET /guitars/id/comments', async () => {
    const mockComments = [makeFakeComment(), makeFakeComment()];
    mockAPI
      .onGet(`${APIRoute.Guitars}/1${APIRoute.Comments}`)
      .reply(200, mockComments);

    const store = mockStore();

    await store.dispatch(fetchCurrentGuitarCommentsAction(1));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadCurrentGuitarComments.toString());
  });

  it('should dispatch setCommentSend when POST /comments', async () => {
    const mockComment = makeFakeComment();
    mockAPI
      .onPost(`${APIRoute.Comments}`)
      .reply(200, []);

    const store = mockStore();

    await store.dispatch(addNewCommentAction(mockComment));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(setCommentSend.toString());
  });

  it('should dispatch setDiscount when POST /coupons', async () => {
    const mockPromo = PromoCode.Light;
    mockAPI
      .onPost(`${APIRoute.Coupons}`)
      .reply(200, []);

    const store = mockStore();

    await store.dispatch(fetchPromoCodeDiscount(mockPromo));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(setDiscount.toString());
  });
});


