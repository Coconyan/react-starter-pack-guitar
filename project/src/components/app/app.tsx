import {
  Route,
  Routes
} from 'react-router-dom';
import { AppRoute } from '../../const';
import CatalogPage from '../../pages/catalog-page/catalog-page';

function App(): JSX.Element {
  return (
    <Routes>
      <Route
        path={AppRoute.Root}
        element={<CatalogPage />}
      />
      {/* <Route
        path="*"
        element={<NotFoundPage />}
      /> */}
    </Routes>
  );
}

export default App;
