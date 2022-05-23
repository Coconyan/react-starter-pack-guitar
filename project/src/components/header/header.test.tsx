import {
  render,
  screen
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { AppRoute } from '../../const';
import HistoryRouter from '../history-router/history-router';
import Header from './header';

const history = createMemoryHistory();

describe('Component: Header', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Root);

    render(
      <HistoryRouter history={history}>
        <Header />
      </HistoryRouter>);

    expect(screen.getByText(/Где купить/i)).toBeInTheDocument();
    expect(screen.getByText(/О компании/i)).toBeInTheDocument();
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
  });
});
