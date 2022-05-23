import {
  render,
  screen
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import { AppRoute } from '../../const';
import NotFoundPage from './not-found-page';

const history = createMemoryHistory();

describe('Component: NotFoundPage', () => {
  it('should render NotFoundPage correctly', () => {
    history.push(AppRoute.Root);

    render(
      <HistoryRouter history={history}>
        <NotFoundPage />
      </HistoryRouter>);

    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
    expect(screen.getByText(/go home/i)).toBeInTheDocument();
  });
});
