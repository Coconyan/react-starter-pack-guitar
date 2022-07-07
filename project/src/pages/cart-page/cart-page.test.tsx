import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  render,
  screen
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-router/history-router';
import { AppRoute } from '../../const';
import { makeFakeGuitar } from '../../mocks/fake-guitar';
import CartPage from './cart-page';

const mockStore = configureMockStore();

const store = mockStore({
  DATA: {
    searchGuitars: [makeFakeGuitar(), makeFakeGuitar()],
  },
  CART: {
    cartGuitars: [makeFakeGuitar()],
  },
});

const history = createMemoryHistory();

describe('Component: Cart add modal', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Cart);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CartPage />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/Промокод на скидку/i)).toBeInTheDocument();
    expect(screen.getByText(/Всего/i)).toBeInTheDocument();
    expect(screen.getByText(/Скидка/i)).toBeInTheDocument();
    expect(screen.getByText(/К оплате/i)).toBeInTheDocument();
  });
});
