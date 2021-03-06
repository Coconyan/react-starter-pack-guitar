import {
  ChangeEvent,
  useEffect,
  useState
} from 'react';
import { DebounceInput } from 'react-debounce-input';
import { Link } from 'react-router-dom';
import {
  URLSearchParamsInit,
  useLocation,
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
import {
  useAppDispatch,
  useAppSelector
} from '../../hooks';
import { fetchGuitarsCatalogAction } from '../../store/api-actions';
import {
  getCatalogGuitars,
  getCatalogLoadingStatus,
  getGuitars,
  getLastQuery
} from '../../store/data/selectors';

function CatalogPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const guitars = useAppSelector(getGuitars);
  const catalogGuitars = useAppSelector(getCatalogGuitars);
  const catalogIsLoading = useAppSelector(getCatalogLoadingStatus);
  const lastQuery = useAppSelector(getLastQuery);
  const { pageId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const [sortPrice, setSortPrice] = useState(searchParams.get('sort') === 'price');
  const [sortPopular, setSortPopular] = useState(searchParams.get('sort') === 'rating');
  const [sortAsc, setSortAsc] = useState(searchParams.get('order') === 'asc');
  const [sortDesc, setSortDesc] = useState(searchParams.get('order') === 'desc');

  const guitarsMinPrice = (catalogGuitars.length !== 0)
    ? Math.min(...catalogGuitars.map((guitar) => guitar.price))
    : Math.min(...guitars.map((guitar) => guitar.price));
  const guitarsMaxPrice = (catalogGuitars.length !== 0)
    ? Math.max(...catalogGuitars.map((guitar) => guitar.price))
    : Math.max(...guitars.map((guitar) => guitar.price));
  const [filterPriceMin, setFilterPriceMin] = useState(searchParams.get('priceMin') || '');
  const [filterPriceMax, setFilterPriceMax] = useState(searchParams.get('priceMax') || '');
  const [filterTypeAcoustic, setFilterTypeAcoustic] = useState(searchParams.get('typeAcoustic') || '');
  const [filterTypeElectric, setFilterTypeElectric] = useState(searchParams.get('typeElectric') || '');
  const [filterTypeUkulele, setFilterTypeUkulele] = useState(searchParams.get('typeUkulele') || '');
  const [filterStringCountFour, setFilterStringCountFour] = useState(searchParams.get('stringCountFour') || '');
  const [filterStringCountSix, setFilterStringCountSix] = useState(searchParams.get('stringCountSix') || '');
  const [filterStringCountSeven, setFilterStringCountSeven] = useState(searchParams.get('stringCountSeven') || '');
  const [filterStringCountTwelve, setFilterStringCountTwelve] = useState(searchParams.get('stringCountTwelve') || '');

  const [currentPage, setCurrentPage] = useState(pageId ? Number(pageId) - 1 : 0);
  const pageCount = Math.ceil((location.search.length !== 0 && catalogGuitars) ? catalogGuitars.length / GUITARS_COUNT_PER_PAGE : guitars.length / GUITARS_COUNT_PER_PAGE);

  const getQueryString = () => {
    let query = '';
    if (sortPrice) { query += '&_sort=price'; }
    if (sortPopular) { query += '&_sort=rating'; }
    if (sortAsc) { query += '&_order=asc'; }
    if (sortDesc) { query += '&_order=desc'; }
    if (filterPriceMin) { query += `&price_gte=${filterPriceMin}`; }
    if (filterPriceMax) { query += `&price_lte=${filterPriceMax}`; }
    if (filterTypeAcoustic) { query += `&type=${filterTypeAcoustic}`; }
    if (filterTypeElectric) { query += `&type=${filterTypeElectric}`; }
    if (filterTypeUkulele) { query += `&type=${filterTypeUkulele}`; }
    if (filterStringCountFour) { query += `&stringCount=${filterStringCountFour}`; }
    if (filterStringCountSix) { query += `&stringCount=${filterStringCountSix}`; }
    if (filterStringCountSeven) { query += `&stringCount=${filterStringCountSeven}`; }
    if (filterStringCountTwelve) { query += `&stringCount=${filterStringCountTwelve}`; }

    return query;
  };

  const handleSetSearchParams = () => {
    const searchObject: URLSearchParamsInit = {};

    // sort
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

    // filter
    if (filterPriceMin.length !== 0) { searchObject.priceMin = filterPriceMin; }
    if (filterPriceMax.length !== 0) { searchObject.priceMax = filterPriceMax; }
    if (filterTypeAcoustic.length !== 0) { searchObject.typeAcoustic = filterTypeAcoustic; }
    if (filterTypeElectric.length !== 0) { searchObject.typeElectric = filterTypeElectric; }
    if (filterTypeUkulele.length !== 0) { searchObject.typeUkulele = filterTypeUkulele; }
    if (filterStringCountFour.length !== 0) { searchObject.stringCountFour = filterStringCountFour; }
    if (filterStringCountSix.length !== 0) { searchObject.stringCountSix = filterStringCountSix; }
    if (filterStringCountSeven.length !== 0) { searchObject.stringCountSeven = filterStringCountSeven; }
    if (filterStringCountTwelve.length !== 0) { searchObject.stringCountTwelve = filterStringCountTwelve; }

    return searchObject;
  };

  useEffect(() => {
    setCurrentPage(pageId ? Number(pageId) - 1 : 0);
    setSearchParams(handleSetSearchParams());
    if (!catalogIsLoading && lastQuery !== getQueryString()) {
      dispatch(fetchGuitarsCatalogAction(getQueryString()));
    }
  }, [dispatch, pageCount, pageId, sortAsc, sortDesc, sortPopular, sortPrice, filterPriceMax, filterPriceMin, filterStringCountFour, filterStringCountSix, filterStringCountSeven, filterStringCountTwelve, filterTypeAcoustic, filterTypeElectric, filterTypeUkulele]);

  const handleSetSortPrice = () => {
    !searchParams.get('order') && setSortAsc(true);
    setSortPrice(true);
    setSortPopular(false);
  };

  const handleSetSortPopular = () => {
    !searchParams.get('order') && setSortAsc(true);
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

  const handleResetFilter = () => {
    setFilterPriceMin('');
    setFilterPriceMax('');
    setFilterTypeAcoustic('');
    setFilterTypeElectric('');
    setFilterTypeUkulele('');
    setFilterStringCountFour('');
    setFilterStringCountSix('');
    setFilterStringCountSeven('');
    setFilterStringCountTwelve('');
    setSearchParams(handleSetSearchParams());
  };

  const handleSetFilterPriceMin = (event: ChangeEvent<HTMLInputElement>) => {
    if (Number(event.target.value) < guitarsMinPrice) {
      setFilterPriceMin('');
      setFilterPriceMin(guitarsMinPrice.toString());
    } else if (filterPriceMax.length !== 0 && (Number(event.target.value) > Number(filterPriceMax))) {
      setFilterPriceMin('');
      setFilterPriceMin(filterPriceMax.toString());
    } else if (Number(event.target.value) > guitarsMaxPrice) {
      setFilterPriceMin('');
      setFilterPriceMin(guitarsMaxPrice.toString());
    } else {
      setFilterPriceMin('');
      setFilterPriceMin(event.target.value);
    }
  };

  const handleSetFilterPriceMax = (event: ChangeEvent<HTMLInputElement>) => {
    if (Number(event.target.value) > guitarsMaxPrice) {
      setFilterPriceMax('');
      setFilterPriceMax(guitarsMaxPrice.toString());
    } else if (Number(event.target.value) < Number(filterPriceMin)) {
      setFilterPriceMax('');
      setFilterPriceMax(filterPriceMin.toString());
    } else {
      setFilterPriceMin('');
      setFilterPriceMax(event.target.value);
    }
  };

  const handleSetFilterAcoustic = (event: ChangeEvent<HTMLInputElement>) => {
    if (filterTypeAcoustic === event.target.value) {
      setFilterTypeAcoustic('');
      (filterTypeUkulele.length !== 0 || filterTypeElectric.length !== 0) && setFilterStringCountTwelve('');
      if (filterTypeUkulele.length !== 0 && filterTypeElectric.length === 0) {
        setFilterStringCountSeven('');
        setFilterStringCountSix('');
      }
    } else {
      filterTypeUkulele.length === 0 && setFilterStringCountFour('');
      setFilterTypeAcoustic(event.target.value);
    }

  };

  const handleSetFilterElectric = (event: ChangeEvent<HTMLInputElement>) => {
    if (filterTypeElectric === event.target.value) {
      setFilterTypeElectric('');
      (filterTypeUkulele.length === 0 && filterTypeAcoustic.length !== 0) && setFilterStringCountFour('');
      if (filterTypeUkulele.length !== 0 && filterTypeAcoustic.length === 0) {
        setFilterStringCountSix('');
        setFilterStringCountSeven('');
      }
    } else {
      filterTypeAcoustic.length === 0 && setFilterStringCountTwelve('');
      setFilterTypeElectric(event.target.value);
    }
  };

  const handleSetFilterUkulele = (event: ChangeEvent<HTMLInputElement>) => {
    if (filterTypeUkulele === event.target.value) {
      setFilterTypeUkulele('');
      (filterTypeElectric.length === 0 && filterTypeAcoustic.length !== 0) && setFilterStringCountFour('');
    } else {
      filterTypeAcoustic.length === 0 && setFilterStringCountTwelve('');
      if (filterTypeAcoustic.length === 0 && filterTypeElectric.length === 0) {
        setFilterStringCountSeven('');
        setFilterStringCountSix('');
      }
      setFilterTypeUkulele(event.target.value);
    }
  };

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">?????????????? ??????????</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Root}>??????????????</Link>
            </li>
            <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Root}>??????????????</Link>
            </li>
          </ul>
          <div className="catalog">
            <form className="catalog-filter">
              <h2 className="title title--bigger catalog-filter__title">????????????</h2>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">????????, ???</legend>
                <div className="catalog-filter__price-range">
                  <div className="form-input">
                    <label className="visually-hidden">?????????????????????? ????????</label>
                    <DebounceInput
                      debounceTimeout={1000}
                      onChange={(event) => handleSetFilterPriceMin(event)}
                      value={filterPriceMin}
                      type="number"
                      placeholder={guitarsMinPrice.toString()}
                      id="priceMin"
                      name="????"
                      min={guitarsMinPrice}
                    />
                  </div>
                  <div className="form-input">
                    <label className="visually-hidden">???????????????????????? ????????</label>
                    <DebounceInput
                      debounceTimeout={1000}
                      onChange={(event) => handleSetFilterPriceMax(event)}
                      value={filterPriceMax}
                      type="number"
                      placeholder={guitarsMaxPrice.toString()}
                      id="priceMax"
                      name="????"
                      min={0}
                    />
                  </div>
                </div>
              </fieldset>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">?????? ??????????</legend>
                <div className="form-checkbox catalog-filter__block-item">
                  <input
                    onChange={(event) => handleSetFilterAcoustic(event)}
                    checked={filterTypeAcoustic.length !== 0}
                    defaultValue={'acoustic'}
                    className="visually-hidden"
                    type="checkbox"
                    id="acoustic"
                    name="acoustic"
                  />
                  <label htmlFor="acoustic">???????????????????????? ????????????</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input
                    onChange={(event) => handleSetFilterElectric(event)}
                    checked={filterTypeElectric.length !== 0}
                    defaultValue={'electric'}
                    className="visually-hidden"
                    type="checkbox"
                    id="electric"
                    name="electric"
                  />
                  <label htmlFor="electric">??????????????????????????</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input
                    onChange={(event) => handleSetFilterUkulele(event)}
                    checked={filterTypeUkulele.length !== 0}
                    defaultValue={'ukulele'}
                    className="visually-hidden"
                    type="checkbox"
                    id="ukulele"
                    name="ukulele"
                  />
                  <label htmlFor="ukulele">??????????????</label>
                </div>
              </fieldset>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">???????????????????? ??????????</legend>
                <div className="form-checkbox catalog-filter__block-item">
                  <input
                    onChange={(event) => setFilterStringCountFour(filterStringCountFour === event.target.value ? '' : event.target.value)}
                    checked={filterStringCountFour.length !== 0}
                    defaultValue={'4'}
                    className="visually-hidden"
                    type="checkbox"
                    id="4-strings"
                    name="4-strings"
                    disabled={location.search.includes('type') && filterTypeUkulele.length === 0 && filterTypeElectric.length === 0}
                  />
                  <label htmlFor="4-strings">4</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input
                    onChange={(event) => setFilterStringCountSix(filterStringCountSix === event.target.value ? '' : event.target.value)}
                    checked={filterStringCountSix.length !== 0}
                    defaultValue={'6'}
                    className="visually-hidden"
                    type="checkbox"
                    id="6-strings"
                    name="6-strings"
                    disabled={location.search.includes('type') && filterTypeAcoustic.length === 0 && filterTypeElectric.length === 0}
                  />
                  <label htmlFor="6-strings">6</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input
                    onChange={(event) => setFilterStringCountSeven(filterStringCountSeven === event.target.value ? '' : event.target.value)}
                    checked={filterStringCountSeven.length !== 0}
                    defaultValue={'7'}
                    className="visually-hidden"
                    type="checkbox"
                    id="7-strings"
                    name="7-strings"
                    disabled={location.search.includes('type') && filterTypeAcoustic.length === 0 && filterTypeElectric.length === 0}
                  />
                  <label htmlFor="7-strings">7</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input
                    onChange={(event) => setFilterStringCountTwelve(filterStringCountTwelve === event.target.value ? '' : event.target.value)}
                    checked={filterStringCountTwelve.length !== 0}
                    defaultValue={'12'}
                    className="visually-hidden"
                    type="checkbox"
                    id="12-strings"
                    name="12-strings"
                    disabled={location.search.includes('type') && filterTypeAcoustic.length === 0}
                  />
                  <label htmlFor="12-strings">12</label>
                </div>
              </fieldset>
              <button
                onClick={handleResetFilter}
                className="catalog-filter__reset-btn button button--black-border button--medium"
                type="reset"
              >????????????????
              </button>
            </form>
            <div className="catalog-sort">
              <h2 className="catalog-sort__title">??????????????????????:</h2>
              <div className="catalog-sort__type">
                <button
                  className={`catalog-sort__type-button ${sortPrice && 'catalog-sort__type-button--active'}`}
                  aria-label="???? ????????"
                  onClick={handleSetSortPrice}
                >???? ????????
                </button>
                <button
                  className={`catalog-sort__type-button ${sortPopular && 'catalog-sort__type-button--active'}`}
                  aria-label="???? ????????????????????????"
                  onClick={handleSetSortPopular}
                >???? ????????????????????????
                </button>
              </div>
              <div className="catalog-sort__order">
                <button
                  className={`catalog-sort__order-button catalog-sort__order-button--up ${sortAsc && 'catalog-sort__order-button--active'}`}
                  onClick={handleSetSortAsc}
                  aria-label="???? ??????????????????????"
                />
                <button
                  className={`catalog-sort__order-button catalog-sort__order-button--down ${sortDesc && 'catalog-sort__order-button--active'}`}
                  onClick={handleSetSortDesc}
                  aria-label="???? ????????????????"
                />
              </div>
            </div>
            {catalogIsLoading
              ? <h1>Loading...</h1>
              : (
                <ProductCardList
                  guitars={
                    (location.search.length !== 0 && catalogGuitars)
                      ? catalogGuitars.slice(currentPage * GUITARS_COUNT_PER_PAGE, currentPage * GUITARS_COUNT_PER_PAGE + GUITARS_COUNT_PER_PAGE)
                      : guitars.slice(currentPage * GUITARS_COUNT_PER_PAGE, currentPage * GUITARS_COUNT_PER_PAGE + GUITARS_COUNT_PER_PAGE)
                  }
                />)}
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
