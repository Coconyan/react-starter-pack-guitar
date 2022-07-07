import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  render,
  screen
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AppRoute } from '../../const';
import { makeFakeGuitar } from '../../mocks/fake-guitar';
import HistoryRouter from '../history-router/history-router';
import CartAddModal from './cart-add-modal';

const mockStore = configureMockStore();

const store = mockStore({
  CART: {
    cartGuitars: [makeFakeGuitar()],
  },
});

const guitar = makeFakeGuitar();

const history = createMemoryHistory();

describe('Component: Cart add modal', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Root);
    const modal = false;
    const setModal = jest.fn();
    const setModalSuccess = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CartAddModal guitar={guitar} setModal={setModal} modal={modal} setModalSuccess={setModalSuccess} />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/Добавить товар в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Артикул/i)).toBeInTheDocument();
    expect(screen.getByText(/Цена/i)).toBeInTheDocument();
  });

  it('should setModal if click close', () => {
    history.push(AppRoute.Root);
    const modal = false;
    const setModal = jest.fn();
    const setModalSuccess = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CartAddModal guitar={guitar} setModal={setModal} modal={modal} setModalSuccess={setModalSuccess} />
        </HistoryRouter>
      </Provider>);

    userEvent.click(screen.getByTestId('close-button'));
    expect(setModal).toBeCalled();
  });
});
