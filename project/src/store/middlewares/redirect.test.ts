import { configureMockStore } from '@jedmao/redux-mock-store';
import { AnyAction } from 'redux';
import { redirect } from './redirect';
import { AppRoute } from '../../const';
import { State } from '../../types/state';
import { redirectToRoute } from '../actions';

const fakeHistory = {
  location: {pathname: ''},
  push(path: string) {
    this.location.pathname = path;
  },
};

jest.mock('../../browser-history', () => fakeHistory);

const middlewares = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });

  it('should be redirect to /', () => {
    store.dispatch(redirectToRoute(AppRoute.Root));
    expect(fakeHistory.location.pathname).toBe(AppRoute.Root);
    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.Root),
    ]);
  });
});
