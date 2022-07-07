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
import CartDeleteModal from './cart-delete-modal';

const mockStore = configureMockStore();

const store = mockStore({
  CART: {
    cartGuitars: [makeFakeGuitar()],
  },
});

const guitar = makeFakeGuitar();

const history = createMemoryHistory();

describe('Component: Cart delete modal', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Cart);
    const modal = false;
    const setModal = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CartDeleteModal guitar={guitar} setModal={setModal} modal={modal} />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/Удалить этот товар/i)).toBeInTheDocument();
    expect(screen.getByText(/Артикул/i)).toBeInTheDocument();
    expect(screen.getByText(/Цена/i)).toBeInTheDocument();
  });

  it('should setModal if click close', () => {
    history.push(AppRoute.Cart);
    const modal = false;
    const setModal = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CartDeleteModal guitar={guitar} setModal={setModal} modal={modal} />
        </HistoryRouter>
      </Provider>);

    userEvent.click(screen.getByTestId('close-button'));
    expect(setModal).toBeCalled();
  });
});
