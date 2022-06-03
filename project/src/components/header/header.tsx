import { useState } from 'react';
import {
  Link,
  useNavigate
} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { getGuitars } from '../../store/data/selectors';

function Header(): JSX.Element {
  const guitars = useAppSelector(getGuitars);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchValue, setSearchValue] = useState('');

  return (
    <header className="header" id="header">
      <div className="container header__wrapper"><Link className="header__logo logo" to={AppRoute.Root}><img className="logo__img" width={70} height={70} src="./img/svg/logo.svg" alt="Логотип" /></Link>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li><Link className={`link main-nav__link ${location.pathname === AppRoute.Root && 'link--current'}`} to={AppRoute.Root}>Каталог</Link>
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
            <input
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
            {guitars.map((guitar) =>
              guitar.name.toLowerCase().includes(searchValue.toLowerCase())
                ? (<li className="form-search__select-item" tabIndex={0} onClick={() => navigate(`${AppRoute.Product}/${guitar.id}`, {replace: true})}>{guitar.name}</li>)
                : '',
            )}
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
