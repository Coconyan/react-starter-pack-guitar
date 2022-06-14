import {
  useEffect,
  useState
} from 'react';
import { DebounceInput } from 'react-debounce-input';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import {
  useAppDispatch,
  useAppSelector
} from '../../hooks';
import { fetchGuitarsSearchAction } from '../../store/api-actions';
import {
  getSearchGuitars,
  getSearchLoadingStatus
} from '../../store/data/selectors';

function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const searchGuitars = useAppSelector(getSearchGuitars);
  const searchIsLoading = useAppSelector(getSearchLoadingStatus);
  const location = useLocation();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (searchValue.length !== 0 && !searchIsLoading) {
      dispatch(fetchGuitarsSearchAction(searchValue));
    }
  }, [dispatch, searchValue]);

  return (
    <header className="header" id="header">
      <div className="container header__wrapper"><Link className={`header__logo logo ${(location.pathname === AppRoute.Root || location.pathname.includes('page_')) && 'link--current'}`} to={AppRoute.Root}><img className="logo__img" width={70} height={70} src="./img/svg/logo.svg" alt="Логотип" /></Link>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li><Link className={`link main-nav__link ${(location.pathname === AppRoute.Root || location.pathname.includes('page_')) && 'link--current'}`} to={AppRoute.Root}>Каталог</Link>
            </li>
            <li><a className="link main-nav__link" href="todo#">Где купить?</a>
            </li>
            <li><a className="link main-nav__link" href="todo#">О компании</a>
            </li>
          </ul>
        </nav>
        <div className="form-search">
          <form className="form-search__form" id="form-search">
            <button className="form-search__submit" type="submit">
              <svg className="form-search__icon" width={14} height={15} aria-hidden="true">
                <use xlinkHref="#icon-search" />
              </svg><span className="visually-hidden">Начать поиск</span>
            </button>
            <DebounceInput
              debounceTimeout={300}
              onChange={(event) => setSearchValue(event.target.value)}
              className="form-search__input"
              id="search"
              type="text"
              autoComplete="off"
              placeholder="что вы ищите?"
              value={searchValue}
            />
            <label className="visually-hidden" htmlFor="search">Поиск</label>
          </form>
          <ul className={`form-search__select-list ${searchValue ? 'list-opened' : 'hidden'}`}>
            {searchIsLoading
              ? (<h1>Loading...</h1>)
              : searchGuitars?.map((guitar) =>
                (
                  <li
                    key={guitar.id}
                    className="form-search__select-item"
                  >
                    <Link className="link" to={`${AppRoute.Product}/${guitar.id}`}>
                      {guitar.name}
                    </Link>
                  </li>
                ))}
          </ul>
          <button onClick={() => setSearchValue('')} className="form-search__reset" type="reset" form="form-search">
            <svg className="form-search__icon" width={14} height={15} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg><span className="visually-hidden">Сбросить поиск</span>
          </button>
        </div>
        <a className="header__cart-link" href="todo#" aria-label="Корзина">
          <svg className="header__cart-icon" width={14} height={14} aria-hidden="true">
            <use xlinkHref="#icon-basket" />
          </svg><span className="visually-hidden">Перейти в корзину</span><span className="header__cart-count">2</span>
        </a>
      </div>
    </header>
  );
}

export default Header;
