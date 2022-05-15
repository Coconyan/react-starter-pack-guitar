import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Rating from '../../components/rating/rating';
import { AppRoute } from '../../const';
import {
  useAppDispatch,
  useAppSelector
} from '../../hooks';
import { fetchCurrentGuitarAction } from '../../store/api-actions';
import { getCurrentGuitar } from '../../store/data/selectors';
import { convertToRussianGuitarType } from '../../utils';

function ProductPage(): JSX.Element {
  const currentGuitar = useAppSelector(getCurrentGuitar);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    if ((currentGuitar && currentGuitar.id !== Number(id)) || !currentGuitar) {
      dispatch(fetchCurrentGuitarAction(Number(id)));
    }
  });

  if ((currentGuitar && currentGuitar.id !== Number(id)) || !currentGuitar) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Товар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Root}>Главная</Link>
            </li>
            <li className="breadcrumbs__item"><a className="link" href={AppRoute.Root}>Каталог</a>
            </li>
            <li className="breadcrumbs__item"><a className="link" href={`${AppRoute.Product}/${id}`}>Товар</a>
            </li>
          </ul>
          <div className="product-container"><img className="product-container__img" src={currentGuitar.previewImg} srcSet={`${currentGuitar.previewImg}@2x.jpg 2x`} width={90} height={235} alt={currentGuitar.name} />
            <div className="product-container__info-wrapper">
              <h2 className="product-container__title title title--big title--uppercase">{currentGuitar.name}</h2>
              <div className="rate product-container__rating">
                <Rating guitar={currentGuitar} width={14} height={14} />
                <p className="visually-hidden">Оценка: Хорошо</p>
                {/* TODO сделать РЕЙТИНГ */}
              </div>
              <div className="tabs"><a className="button button--medium tabs__button" href="#characteristics">Характеристики</a><a className="button button--black-border button--medium tabs__button" href="#description">Описание</a>
                <div className="tabs__content" id="characteristics">
                  <table className="tabs__table">
                    <tbody>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Артикул:</td>
                        <td className="tabs__value">{currentGuitar.vendorCode}</td>
                      </tr>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Тип:</td>
                        <td className="tabs__value">{convertToRussianGuitarType(currentGuitar.type)}</td>
                        {/* TODO map for type */}
                      </tr>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Количество струн:</td>
                        <td className="tabs__value">{currentGuitar.stringCount} струнная</td>
                      </tr>
                    </tbody>
                  </table>
                  {/* TODO tabs desc charact */}
                  <p className="tabs__product-description hidden">{currentGuitar.description}</p>
                </div>
              </div>
            </div>
            <div className="product-container__price-wrapper">
              <p className="product-container__price-info product-container__price-info--title">Цена:</p>
              <p className="product-container__price-info product-container__price-info--value">{currentGuitar.price} ₽</p><a className="button button--red button--big product-container__button" href="#todo">Добавить в корзину</a>
            </div>
          </div>
          <section className="reviews">
            <h3 className="reviews__title title title--bigger">Отзывы</h3><a className="button button--red-border button--big reviews__sumbit-button" href="#todo">Оставить отзыв</a>
            <div className="review">
              <div className="review__wrapper">
                <h4 className="review__title review__title--author title title--lesser">Иванов Максим</h4><span className="review__date">12 декабря</span>
              </div>
              <div className="rate review__rating-panel">
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-star" />
                </svg>
                <p className="visually-hidden">Оценка: Хорошо</p>
              </div>
              <h4 className="review__title title title--lesser">Достоинства:</h4>
              <p className="review__value">Хороший корпус, чистый звук, стурны хорошего качества</p>
              <h4 className="review__title title title--lesser">Недостатки:</h4>
              <p className="review__value">Тугие колонки</p>
              <h4 className="review__title title title--lesser">Комментарий:</h4>
              <p className="review__value">У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня.</p>
            </div>
            <div className="review">
              <div className="review__wrapper">
                <h4 className="review__title review__title--author title title--lesser">Перова Ольга</h4><span className="review__date">12 декабря</span>
              </div>
              <div className="rate review__rating-panel">
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-star" />
                </svg>
                <p className="visually-hidden">Оценка: Хорошо</p>
              </div>
              <h4 className="review__title title title--lesser">Достоинства:</h4>
              <p className="review__value">Хороший корпус, чистый звук, стурны хорошего качества</p>
              <h4 className="review__title title title--lesser">Недостатки:</h4>
              <p className="review__value">Тугие колонки</p>
              <h4 className="review__title title title--lesser">Комментарий:</h4>
              <p className="review__value">У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. </p>
            </div>
            <div className="review">
              <div className="review__wrapper">
                <h4 className="review__title review__title--author title title--lesser">Преображенская  Ксения</h4><span className="review__date">12 декабря</span>
              </div>
              <div className="rate review__rating-panel">
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
                <svg width={16} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-star" />
                </svg>
                <p className="visually-hidden">Оценка: Хорошо</p>
              </div>
              <h4 className="review__title title title--lesser">Достоинства:</h4>
              <p className="review__value">Хороший корпус, чистый звук, стурны хорошего качества</p>
              <h4 className="review__title title title--lesser">Недостатки:</h4>
              <p className="review__value">Тугие колонки</p>
              <h4 className="review__title title title--lesser">Комментарий:</h4>
              <p className="review__value">У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. </p>
            </div>
            <button className="button button--medium reviews__more-button">Показать еще отзывы</button><a className="button button--up button--red-border button--big reviews__up-button" href="#header">Наверх</a>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ProductPage;
