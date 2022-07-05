import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { getCartGuitars } from '../../store/data copy/selectors';
import { Guitar } from '../../types/guitar';
import { convertToRussianRating } from '../../utils';
import CartAddModalSuccess from '../cart-add-modal-success/cart-add-modal-success';
import CartAddModal from '../cart-add-modal/cart-add-modal';
import Rating from '../rating/rating';

type PropsType = {
  guitar: Guitar;
}

function ProductCard({ guitar }: PropsType): JSX.Element {
  const cartGuitars = useAppSelector(getCartGuitars);
  const [modalCart, setModalCart] = useState(false);
  const [modalCartSuccess, setModalCartSuccess] = useState(false);
  const isCartGuitar = cartGuitars.find((cartGuitar) => cartGuitar.id === guitar.id);

  return (
    <div className="product-card"><img src={guitar.previewImg} srcSet={`${guitar.previewImg.slice(0, -4)}@2x.jpg 2x`} width={75} height={190} alt={guitar.name} />
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <Rating rating={guitar.rating} />
          <p className="visually-hidden">Рейтинг: {convertToRussianRating(guitar.rating)}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{guitar.comments?.length}</p>
        </div>
        <p className="product-card__title">{guitar.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{guitar.price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <Link className="button button--mini" to={`${AppRoute.Product}/${guitar.id}`}>Подробнее</Link>
        {isCartGuitar
          ? (
            <Link
              className="button button--red-border button--mini button--in-cart"
              to={AppRoute.Cart}
            >В Корзине
            </Link>)
          : (
            <button
              className="button button--red button--mini button--add-to-cart"
              onClick={() => setModalCart(true)}
            >Купить
            </button>)}
      </div>
      {modalCart && <CartAddModal guitar={guitar} setModal={setModalCart} modal={modalCart} setModalSuccess={setModalCartSuccess} />}
      {modalCartSuccess && <CartAddModalSuccess setModal={setModalCartSuccess} modal={modalCartSuccess} />}
    </div>
  );
}

export default ProductCard;
