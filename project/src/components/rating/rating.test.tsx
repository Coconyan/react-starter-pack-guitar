import {
  render,
  screen
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { AppRoute } from '../../const';
import HistoryRouter from '../history-router/history-router';
import Rating from './rating';

const history = createMemoryHistory();

describe('Component: Rating', () => {
  it('should render Rating correctly', () => {
    history.push(AppRoute.Root);

    render(
      <HistoryRouter history={history}>
        <Rating rating={4}/>
      </HistoryRouter>);

    expect(screen.getByTestId('rating-empty-star')).toBeInTheDocument();
  });

  it('should render Rating full-star correctly', () => {
    history.push(AppRoute.Root);

    render(
      <HistoryRouter history={history}>
        <Rating rating={1}/>
      </HistoryRouter>);

    expect(screen.getByTestId('rating-full-star')).toBeInTheDocument();
  });
});
