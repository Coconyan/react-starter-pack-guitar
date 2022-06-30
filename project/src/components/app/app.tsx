import {
  Route,
  Routes
} from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import CartPage from '../../pages/cart-page/cart-page';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import ProductPage from '../../pages/product-page/product-page';
import { getDataLoadedStatus } from '../../store/data/selectors';

function App(): JSX.Element {
  const isDataLoaded = useAppSelector(getDataLoadedStatus);

  if (!isDataLoaded) {
    return (
      <h1>Loading...</h1>
    );
  }

  return (
    <Routes>
      <Route
        path={AppRoute.Root}
        element={<CatalogPage />}
      >
        <Route
          path={`${AppRoute.Root}page_:pageId`}
          element={<CatalogPage />}
        />
      </Route>
      <Route
        path={`${AppRoute.Product}/:id`}
        element={<ProductPage />}
      />
      <Route
        path={AppRoute.Cart}
        element={<CartPage />}
      />
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
}

export default App;
