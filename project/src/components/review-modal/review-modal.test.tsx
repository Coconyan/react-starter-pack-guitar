import {
  render,
  screen
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { AppRoute } from '../../const';
import userEvent from '@testing-library/user-event';
import ReviewModal from './review-modal';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';

const mockStore = configureMockStore();

const store = mockStore({
  DATA: {},
});

const guitarName = 'name';
const guitarId = 1;
const setModal = jest.fn();

const history = createMemoryHistory();

describe('Component: ReviewModal', () => {
  it('should render ReviewModal correctly', () => {
    history.push(AppRoute.Product);
    const userName = 'John';
    const advantage = 'Good';
    const disadvantage = 'Bad';
    const reviewText = 'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.';

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewModal guitarId={guitarId} guitarName={guitarName} setModal={setModal} modal />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Ваше Имя/i)).toBeInTheDocument();
    expect(screen.getByTestId(/star-5/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Достоинства/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Недостатки/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Комментарий/i)).toBeInTheDocument();

    userEvent.type(screen.getByLabelText(/Ваше Имя/i), userName);
    userEvent.click(screen.getByTestId('star-5'));
    userEvent.type(screen.getByLabelText(/Достоинства/i), advantage);
    userEvent.type(screen.getByLabelText(/Недостатки/i), disadvantage);
    userEvent.type(screen.getByLabelText(/Комментарий/i), reviewText);

    expect(screen.getByDisplayValue(userName)).toBeInTheDocument();
    expect(screen.getByDisplayValue(advantage)).toBeInTheDocument();
    expect(screen.getByTestId('star-5')).toBeChecked();
    expect(screen.getByDisplayValue(disadvantage)).toBeInTheDocument();
    expect(screen.getByDisplayValue(reviewText)).toBeInTheDocument();
  });
});
