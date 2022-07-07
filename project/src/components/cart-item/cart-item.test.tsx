import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  render,
  screen
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AppRoute } from '../../const';
import { makeFakeGuitar } from '../../mocks/fake-guitar';
import HistoryRouter from '../history-router/history-router';
import CartItem from './cart-item';

const mockStore = configureMockStore();

const store = mockStore({
  CART: {
    cartGuitars: [makeFakeGuitar()],
  },
});

const guitar = makeFakeGuitar();

const history = createMemoryHistory();

describe('Component: Cart item', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Cart);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CartItem guitar={guitar} />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/Артикул/i)).toBeInTheDocument();
    expect(screen.getByText(/струнная/i)).toBeInTheDocument();
  });
});
