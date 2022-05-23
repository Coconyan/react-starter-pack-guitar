import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  render,
  screen
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AppRoute } from '../../const';
import { makeFakeComment } from '../../mocks/fake-comment';
import HistoryRouter from '../history-router/history-router';

const mockStore = configureMockStore();

const store = mockStore({
  DATA: {
    guitarsComments: [[makeFakeComment(), makeFakeComment()]],
  },
});

const history = createMemoryHistory();

describe('Component: ProductCard', () => {
  it('should render ProductCard correctly', () => {
    history.push(AppRoute.Root);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <h1> Mock product card </h1>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/Mock product card/i)).toBeInTheDocument();
  });
});
