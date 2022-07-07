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
import NotFoundPage from './not-found-page';

const mockStore = configureMockStore();

const store = mockStore({
  DATA: {
    guitars: [makeFakeGuitar(), makeFakeGuitar()],
  },
  CART: {
    cartGuitars: [makeFakeGuitar(), makeFakeGuitar()],
  },
});

const history = createMemoryHistory();

describe('Component: NotFoundPage', () => {
  it('should render NotFoundPage correctly', () => {
    history.push(AppRoute.Root);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <NotFoundPage />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
    expect(screen.getByText(/go home/i)).toBeInTheDocument();
  });
});
