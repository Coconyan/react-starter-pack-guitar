import dayjs from 'dayjs';
// import { createFocusTrap } from 'focus-trap';
import {
  useEffect,
  useState
} from 'react';
import {
  Link,
  useLocation
} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import CartAddModalSuccess from '../../components/cart-add-modal-success/cart-add-modal-success';
import CartAddModal from '../../components/cart-add-modal/cart-add-modal';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Rating from '../../components/rating/rating';
import ReviewModalSuccess from '../../components/review-modal-success/review-modal-success';
import ReviewModal from '../../components/review-modal/review-modal';
import ReviewsList from '../../components/reviews-list/reviews-list';
import { AppRoute } from '../../const';
import {
  useAppDispatch,
  useAppSelector
} from '../../hooks';
import {
  fetchCurrentGuitarAction,
  fetchCurrentGuitarCommentsAction
} from '../../store/api-actions';
import {
  getCurrentGuitar,
  getCurrentGuitarComments
} from '../../store/data/selectors';
import { Comments } from '../../types/comment';
import {
  convertToRussianGuitarType,
  convertToRussianRating
} from '../../utils';

function ProductPage(): JSX.Element {
  const currentGuitar = useAppSelector(getCurrentGuitar);
  const currentGuitarComments = useAppSelector(getCurrentGuitarComments);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [count, setCount] = useState(3);
  const [modal, setModal] = useState(false);
  const [modalCart, setModalCart] = useState(false);
  const [modalCartSuccess, setModalCartSuccess] = useState(false);
  const location = useLocation();
  const [descriptionTab, setDescriptionTab] = useState(location.hash === '#description');
  const sortedCurrentGuitarComments: Comments = currentGuitarComments.slice();

  // const modalFocusSuccessTrap = createFocusTrap('.modal--success');

  if (currentGuitarComments.length !== 0) {
    sortedCurrentGuitarComments.sort((commentPrev, commentNext) => dayjs(commentNext.createAt).unix() - dayjs(commentPrev.createAt).unix());
  }

  useEffect(() => {
    if (((currentGuitar && currentGuitar.id !== Number(id)) || !currentGuitar) && currentGuitarComments) {
      dispatch(fetchCurrentGuitarAction(Number(id)));
      dispatch(fetchCurrentGuitarCommentsAction(Number(id)));
    }
  }, [currentGuitar, currentGuitarComments, dispatch, id]);

  if ((currentGuitar && currentGuitar.id !== Number(id)) || !currentGuitar) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">{currentGuitar.name}</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Root}>Главная</Link>
            </li>
            <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Root}>Каталог</Link>
            </li>
            <li className="breadcrumbs__item"><Link className="link" to={`${AppRoute.Product}/${id}`}>{currentGuitar.name}</Link>
            </li>
          </ul>
          <div className="product-container">
            <img className="product-container__img" src={currentGuitar.previewImg} srcSet={`${currentGuitar.previewImg.slice(0, -4)}@2x.jpg 2x`} width={90} height={235} alt={currentGuitar.name} />
            <div className="product-container__info-wrapper">
              <h2 className="product-container__title title title--big title--uppercase">{currentGuitar.name}</h2>
              <div className="rate product-container__rating">
                <Rating rating={currentGuitar.rating} width={14} height={14} />
                <p className="visually-hidden">Оценка: {convertToRussianRating(currentGuitar.rating)}</p>
                <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{sortedCurrentGuitarComments.length}</p>
                <p className="rate__count"></p>
              </div>
              <div className="tabs">
                <Link
                  className={descriptionTab ? 'button button--black-border button--medium tabs__button' : 'button button--medium tabs__button'}
                  to={`${AppRoute.Product}/${id}#characteristics`}
                  onClick={() => setDescriptionTab(false)}
                >Характеристики
                </Link>
                <Link
                  className={descriptionTab ? 'button button--medium tabs__button' : 'button button--black-border button--medium tabs__button'}
                  to={`${AppRoute.Product}/${id}#description`}
                  onClick={() => setDescriptionTab(true)}
                >Описание
                </Link>
                <div className="tabs__content" id={descriptionTab ? 'description' : 'characteristics'}>
                  <table className={`tabs__table ${descriptionTab ? 'hidden' : ''}`}>
                    <tbody>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Артикул:</td>
                        <td className="tabs__value">{currentGuitar.vendorCode}</td>
                      </tr>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Тип:</td>
                        <td className="tabs__value">{convertToRussianGuitarType(currentGuitar.type)}</td>
                      </tr>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Количество струн:</td>
                        <td className="tabs__value">{currentGuitar.stringCount} струнная</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className={`tabs__product-description ${descriptionTab ? '' : 'hidden'}`}>{currentGuitar.description}</p>
                </div>
              </div>
            </div>
            <div className="product-container__price-wrapper">
              <p className="product-container__price-info product-container__price-info--title">Цена:</p>
              <p className="product-container__price-info product-container__price-info--value">{currentGuitar.price} ₽</p><Link className="button button--red button--big product-container__button" to={`${AppRoute.Product}/${id}`} onClick={() => setModalCart(true)}>Добавить в корзину</Link>
            </div>
          </div>
          <section className="reviews">
            <h3 className="reviews__title title title--bigger">Отзывы</h3>
            <button className="button button--red-border button--big reviews__sumbit-button" onClick={() => setModal(true)}>Оставить отзыв</button>
            {modal && <ReviewModal guitarName={currentGuitar.name} guitarId={currentGuitar.id} setModal={setModal} modal={modal} />}
            {<ReviewModalSuccess guitarId={currentGuitar.id} />}
            {<CartAddModal guitar={currentGuitar} setModal={setModalCart} modal={modalCart} setModalSuccess={setModalCartSuccess} />}
            {<CartAddModalSuccess setModal={setModalCartSuccess} modal={modalCartSuccess} />}
            <ReviewsList reviews={sortedCurrentGuitarComments.slice(0, count)} />
            {count < sortedCurrentGuitarComments.length
              ? (
                <button
                  className="button button--medium reviews__more-button"
                  onClick={() => { setCount(count + 3); }}
                >Показать еще отзывы
                </button>
              ) : ''}
            <a className="button button--up button--red-border button--big reviews__up-button" href={`${AppRoute.Product}/${id}#header`}>Наверх</a>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ProductPage;
