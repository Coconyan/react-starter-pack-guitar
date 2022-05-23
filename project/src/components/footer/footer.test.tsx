import {
  render,
  screen
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { AppRoute } from '../../const';
import HistoryRouter from '../history-router/history-router';
import Footer from './footer';

const history = createMemoryHistory();

describe('Component: Footer', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Root);

    render(
      <HistoryRouter history={history}>
        <Footer />
      </HistoryRouter>);

    expect(screen.getByText(/О нас/i)).toBeInTheDocument();
    expect(screen.getByText(/Информация/i)).toBeInTheDocument();
    expect(screen.getByText(/Режим работы/i)).toBeInTheDocument();
  });
});
