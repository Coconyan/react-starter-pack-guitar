import {
  render,
  screen
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { AppRoute } from '../../const';
import ReviewsList from './reviews-list';
import { makeFakeComment } from '../../mocks/fake-comment';

const reviews = [makeFakeComment()];

const history = createMemoryHistory();

describe('Component: ReviewsList', () => {
  it('should render ReviewsList correctly', () => {
    history.push(AppRoute.Product);

    render(
      <HistoryRouter history={history}>
        <ReviewsList reviews={reviews} />
      </HistoryRouter>);

    expect(screen.getByText(/Достоинства/i)).toBeInTheDocument();
    expect(screen.getByText(/Недостатки/i)).toBeInTheDocument();
    expect(screen.getByText(/Комментарий/i)).toBeInTheDocument();
  });
});
