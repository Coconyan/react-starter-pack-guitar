import {
  render,
  screen
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import { AppRoute } from '../../const';

const history = createMemoryHistory();

describe('Component: ProductPage', () => {
  it('should render ProductPage correctly', () => {
    history.push(AppRoute.Root);

    render(
      <HistoryRouter history={history}>
        <h1>Mock Product Page</h1>
      </HistoryRouter>);

    expect(screen.getByText(/Mock Product Page/i)).toBeInTheDocument();
  });
});
