import {
  render,
  screen
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { AppRoute } from '../../const';
import HistoryRouter from '../history-router/history-router';
import CartAddModalSuccess from './cart-add-modal-success';

const history = createMemoryHistory();

describe('Component: Cart add modal success', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Root);
    const modal = false;
    const setModal = jest.fn();

    render(
      <HistoryRouter history={history}>
        <CartAddModalSuccess setModal={setModal} modal={modal} />
      </HistoryRouter>);

    expect(screen.getByText(/Товар успешно добавлен в корзину/i)).toBeInTheDocument();
  });

  it('should setModal if click close', () => {
    history.push(AppRoute.Root);
    const modal = false;
    const setModal = jest.fn();

    render(
      <HistoryRouter history={history}>
        <CartAddModalSuccess setModal={setModal} modal={modal} />
      </HistoryRouter>);

    userEvent.click(screen.getByTestId('close-button'));
    expect(setModal).toBeCalled();
  });
});
