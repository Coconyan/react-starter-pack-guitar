import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  render,
  screen
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AppRoute } from '../../const';
import { makeFakeComment } from '../../mocks/fake-comment';
import { makeFakeGuitar } from '../../mocks/fake-guitar';
import HistoryRouter from '../history-router/history-router';
import ProductCard from './product-card';

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
          <ProductCard guitar={makeFakeGuitar()} />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/Подробнее/i)).toBeInTheDocument();
  });
});
