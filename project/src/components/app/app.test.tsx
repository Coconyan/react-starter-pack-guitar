import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import {
  AppRoute
} from '../../const';
import {
  Route,
  Routes
} from 'react-router-dom';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeGuitar } from '../../mocks/fake-guitar';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();

const store = mockStore({
  DATA: {
    guitars: [makeFakeGuitar(), makeFakeGuitar()],
  },
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<h1>Mock Catalog Page</h1>}
        >
          <Route
            path={`${AppRoute.Root}page_:pageId`}
            element={<h1>Mock Catalog Page</h1>}
          />
        </Route>
        <Route
          path={`${AppRoute.Product}/:id`}
          element={<h1>Mock Product Page</h1>}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "CatalogPage" when user navigate to "/"', () => {
    history.push(AppRoute.Root);

    render(fakeApp);

    expect(screen.getByText(/Mock Catalog Page/i)).toBeInTheDocument();
  });

  it('should render "ProductPage" when user navigate to "/guitars/id"', () => {
    history.push(`${AppRoute.Product}/1`);

    render(fakeApp);

    expect(screen.getByText(/Mock Product Page/i)).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(screen.getByText('go home')).toBeInTheDocument();
  });
});
