import {
  useEffect,
  useState
} from 'react';
import {
  URLSearchParamsInit,
  useNavigate,
  useParams,
  useSearchParams
} from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import PaginationList from '../../components/pagination-list/pagination-list';
import ProductCardList from '../../components/product-card-list/product-card-list';
import {
  AppRoute,
  GUITARS_COUNT_PER_PAGE
} from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchGuitarsCatalogAction } from '../../store/api-actions';
import { getCatalogGuitars, getGuitars } from '../../store/data/selectors';

function CatalogPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const guitars = useAppSelector(getGuitars);
  const catalogGuitars = useAppSelector(getCatalogGuitars);
  const navigate = useNavigate();
  const { pageId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageCount = Math.ceil((catalogGuitars && catalogGuitars?.length !== 0) ? catalogGuitars.length / GUITARS_COUNT_PER_PAGE : guitars.length / GUITARS_COUNT_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(pageId ? Number(pageId) - 1 : 0);
  const [sortPrice, setSortPrice] = useState(searchParams.get('sort') === 'price');
  const [sortPopular, setSortPopular] = useState(searchParams.get('sort') === 'rating');
  const [sortAsc, setSortAsc] = useState(searchParams.get('order') === 'asc');
  const [sortDesc, setSortDesc] = useState(searchParams.get('order') === 'desc');

  useEffect(() => {
    setCurrentPage(pageId ? Number(pageId) - 1 : 0);
    (Number(pageId) > pageCount || (pageId && isNaN(Number(pageId)))) && navigate(AppRoute.NotFound, {replace: true});
    if (sortPrice || sortPopular || sortAsc || sortDesc) {
      setSearchParams(handleSetSearchParams());
      dispatch(fetchGuitarsCatalogAction(getQueryString()));
    }
  }, [dispatch, navigate, pageCount, pageId, sortAsc, sortDesc, sortPopular, sortPrice]);

  const getQueryString = () => {
    let query = '';
    if (sortPrice) {query += '&_sort=price';}
    if (sortPopular) {query += '&_sort=rating';}
    if (sortAsc) {query += '&_order=asc';}
    if (sortDesc) {query += '&_order=desc';}

    return query;
  };

  const handleSetSearchParams = () => {
    const searchObject: URLSearchParamsInit = {};

    if (sortPrice) {
      searchObject.sort = 'price';
    } else if (sortPopular) {
      searchObject.sort = 'rating';
    }
    if (sortAsc) {
      searchObject.order = 'asc';
    } else if (sortDesc) {
      searchObject.order = 'desc';
    }

    return searchObject;
  };

  const handleSetSortPrice = () => {
    setSortPrice(true);
    setSortPopular(false);
  };

  const handleSetSortPopular = () => {
    setSortPopular(true);
    setSortPrice(false);
  };

  const handleSetSortAsc = () => {
    !searchParams.get('sort') && setSortPrice(true);
    setSortAsc(true);
    setSortDesc(false);
  };

  const handleSetSortDesc = () => {
    !searchParams.get('sort') && setSortPrice(true);
    setSortDesc(true);
    setSortAsc(false);
  };

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item"><a className="link" href={AppRoute.Root}>Главная</a>
            </li>
            <li className="breadcrumbs__item"><a className="link" href={AppRoute.Root}>Каталог</a>
            </li>
          </ul>
          <div className="catalog">
            <form className="catalog-filter">
              <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Цена, ₽</legend>
                <div className="catalog-filter__price-range">
                  <div className="form-input">
                    <label className="visually-hidden">Минимальная цена</label>
                    <input type="number" placeholder="1 000" id="priceMin" name="от" />
                  </div>
                  <div className="form-input">
                    <label className="visually-hidden">Максимальная цена</label>
                    <input type="number" placeholder="30 000" id="priceMax" name="до" />
                  </div>
                </div>
              </fieldset>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Тип гитар</legend>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="acoustic" name="acoustic" />
                  <label htmlFor="acoustic">Акустические гитары</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="electric" name="electric" defaultChecked />
                  <label htmlFor="electric">Электрогитары</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="ukulele" name="ukulele" defaultChecked />
                  <label htmlFor="ukulele">Укулеле</label>
                </div>
              </fieldset>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Количество струн</legend>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="4-strings" name="4-strings" defaultChecked />
                  <label htmlFor="4-strings">4</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="6-strings" name="6-strings" defaultChecked />
                  <label htmlFor="6-strings">6</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="7-strings" name="7-strings" />
                  <label htmlFor="7-strings">7</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="12-strings" name="12-strings" disabled />
                  <label htmlFor="12-strings">12</label>
                </div>
              </fieldset>
              <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset">Очистить</button>
            </form>
            <div className="catalog-sort">
              <h2 className="catalog-sort__title">Сортировать:</h2>
              <div className="catalog-sort__type">
                <button
                  className={`catalog-sort__type-button ${sortPrice && 'catalog-sort__type-button--active'}`}
                  aria-label="по цене"
                  onClick={handleSetSortPrice}
                >по цене
                </button>
                <button
                  className={`catalog-sort__type-button ${sortPopular && 'catalog-sort__type-button--active'}`}
                  aria-label="по популярности"
                  onClick={handleSetSortPopular}
                >по популярности
                </button>
              </div>
              <div className="catalog-sort__order">
                <button
                  className={`catalog-sort__order-button catalog-sort__order-button--up ${sortAsc && 'catalog-sort__order-button--active'}`}
                  onClick={handleSetSortAsc}
                  aria-label="По возрастанию"
                />
                <button
                  className={`catalog-sort__order-button catalog-sort__order-button--down ${sortDesc && 'catalog-sort__order-button--active'}`}
                  onClick={handleSetSortDesc}
                  aria-label="По убыванию"
                />
              </div>
            </div>
            <ProductCardList
              guitars={
                (catalogGuitars && catalogGuitars?.length !== 0 && (sortPrice || sortPopular || sortAsc || sortDesc))
                  ? catalogGuitars.slice(currentPage * GUITARS_COUNT_PER_PAGE, currentPage * GUITARS_COUNT_PER_PAGE + GUITARS_COUNT_PER_PAGE)
                  : guitars.slice(currentPage * GUITARS_COUNT_PER_PAGE, currentPage * GUITARS_COUNT_PER_PAGE + GUITARS_COUNT_PER_PAGE)
              }
            />
            <div className="pagination page-content__pagination">
              <PaginationList currentPage={currentPage} pageCount={pageCount} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>

  );
}

export default CatalogPage;
