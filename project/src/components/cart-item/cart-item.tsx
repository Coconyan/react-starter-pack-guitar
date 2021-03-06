import {
  ChangeEvent,
  useState
} from 'react';
import { DebounceInput } from 'react-debounce-input';
import {
  useAppDispatch,
  useAppSelector
} from '../../hooks';
import { loadCartGuitars } from '../../store/cart/cart';
import { getCartGuitars } from '../../store/cart/selectors';
import { Guitar } from '../../types/guitar';
import {
  cartGuitarDecrement,
  cartGuitarIncrement,
  cartGuitarInputCount,
  numberWithSpaces
} from '../../utils';
import CartDeleteModal from '../cart-delete-modal/cart-delete-modal';

type PropsType = {
  guitar: Guitar,
}

function CartItem({ guitar }: PropsType): JSX.Element {
  const dispatch = useAppDispatch();
  const cartGuitars = useAppSelector(getCartGuitars);
  const [currentGuitarCount, setCurrentGuitarCount] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleSetFilterUkulele = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length !== 0 && Number(event.target.value) > 0) {
      dispatch(loadCartGuitars(cartGuitarInputCount(cartGuitars, guitar, Number(event.target.value), setCurrentGuitarCount)));
      setCurrentGuitarCount(Number(event.target.value));
    } else {
      dispatch(loadCartGuitars(cartGuitarInputCount(cartGuitars, guitar, 1, setCurrentGuitarCount)));
      setCurrentGuitarCount(0);
      setCurrentGuitarCount(1);
    }
  };

  return (
    <div className="cart-item">
      <button
        className="cart-item__close-button button-cross"
        type="button"
        aria-label="Удалить"
        onClick={() => setDeleteModal(true)}
      ><span className="button-cross__icon" /><span className="cart-item__close-button-interactive-area" />
      </button>
      <div className="cart-item__image"><img src={guitar.previewImg} srcSet={`${guitar.previewImg.slice(0, -4)}@2x.jpg 2x`} width={55} height={130} alt="СURT Z30 Plus" />
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{guitar.name}</p>
        <p className="product-info__info">Артикул: {guitar.vendorCode}</p>
        <p className="product-info__info">Электрогитара, {guitar.stringCount} струнная</p>
      </div>
      <div className="cart-item__price">{numberWithSpaces(guitar.price)} ₽</div>
      <div className="quantity cart-item__quantity">
        <button
          className="quantity__button"
          aria-label="Уменьшить количество"
          onClick={() => {
            guitar.cartCount === 1
              ? setDeleteModal(true)
              : dispatch(loadCartGuitars(cartGuitarDecrement(cartGuitars, guitar, setCurrentGuitarCount)));
          }}
        >
          <svg width={8} height={8} aria-hidden="true">
            <use xlinkHref="#icon-minus" />
          </svg>
        </button>
        <DebounceInput
          debounceTimeout={1000}
          className="quantity__input"
          type="number"
          placeholder={guitar.cartCount}
          value={currentGuitarCount === 0 ? undefined : currentGuitarCount}
          onChange={(event) => handleSetFilterUkulele(event)}
          id="4-count"
          name="4-count"
          max={99}
        />
        <button
          className="quantity__button"
          aria-label="Увеличить количество"
          onClick={() => dispatch(loadCartGuitars(cartGuitarIncrement(cartGuitars, guitar, setCurrentGuitarCount)))}
        >
          <svg width={8} height={8} aria-hidden="true">
            <use xlinkHref="#icon-plus" />
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">{guitar.cartCount ? numberWithSpaces(guitar.price * guitar.cartCount) : numberWithSpaces(guitar.price)} ₽</div>
      {deleteModal && <CartDeleteModal guitar={guitar} setModal={setDeleteModal} modal={deleteModal} />}
    </div>
  );
}

export default CartItem;
