import {
  Route,
  Routes
} from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import CatalogPage from '../../pages/catalog-page/catalog-page';
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
      />
      {/* <Route
        path="*"
        element={<NotFoundPage />}
      /> */}
    </Routes>
  );
}

export default App;
