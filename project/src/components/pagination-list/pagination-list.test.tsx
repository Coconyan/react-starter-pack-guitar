import {
  render,
  screen
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { AppRoute } from '../../const';
import HistoryRouter from '../history-router/history-router';
import PaginationList from './pagination-list';

const history = createMemoryHistory();

describe('Component: PaginationList', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Root);

    render(
      <HistoryRouter history={history}>
        <PaginationList currentPage={0} pageCount={1} />
      </HistoryRouter>);

    expect(screen.getByText(/1/i)).toBeInTheDocument();
  });

  it('should render "Далее" if currentPage !== pageCount - 1', () => {
    history.push(AppRoute.Root);

    render(
      <HistoryRouter history={history}>
        <PaginationList currentPage={0} pageCount={2} />
      </HistoryRouter>);

    expect(screen.getByText(/Далее/i)).toBeInTheDocument();
    expect(screen.getByText(/1/i)).toBeInTheDocument();
    expect(screen.getByText(/2/i)).toBeInTheDocument();
  });

  it('should render "Назад" if currentPage !== 0', () => {
    history.push(AppRoute.Root);

    render(
      <HistoryRouter history={history}>
        <PaginationList currentPage={1} pageCount={2} />
      </HistoryRouter>);

    expect(screen.getByText(/Назад/i)).toBeInTheDocument();
    expect(screen.getByText(/1/i)).toBeInTheDocument();
    expect(screen.getByText(/2/i)).toBeInTheDocument();
  });

  it('should render "Назад" and "Далее" if currentPage !== 0 and currentPage !== pageCount - 1', () => {
    history.push(AppRoute.Root);

    render(
      <HistoryRouter history={history}>
        <PaginationList currentPage={1} pageCount={3} />
      </HistoryRouter>);

    expect(screen.getByText(/Назад/i)).toBeInTheDocument();
    expect(screen.getByText(/Далее/i)).toBeInTheDocument();
    expect(screen.getByText(/1/i)).toBeInTheDocument();
    expect(screen.getByText(/2/i)).toBeInTheDocument();
    expect(screen.getByText(/3/i)).toBeInTheDocument();
  });
});
