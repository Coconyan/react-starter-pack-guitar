import {
  render,
  screen
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { AppRoute } from '../../const';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import ReviewModalSuccess from './review-modal-success';

const mockStore = configureMockStore();

const store = mockStore({
  DATA: {
    isCommentSent: false,
  },
});

const guitarId = 1;

const history = createMemoryHistory();

describe('Component: ReviewModalSuccess', () => {
  it('should render ReviewModalSuccess correctly', () => {
    history.push(AppRoute.Product);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewModalSuccess guitarId={guitarId} modalFocusTrap={undefined} />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/Спасибо за ваш отзыв!/i)).toBeInTheDocument();
  });
});
