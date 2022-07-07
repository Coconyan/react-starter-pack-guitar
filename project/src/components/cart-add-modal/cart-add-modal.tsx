import TrapFocus from '@mui/base/TrapFocus';
import {
  useAppDispatch,
  useAppSelector
} from '../../hooks';
import { loadCartGuitars } from '../../store/cart/cart';
import { getCartGuitars } from '../../store/cart/selectors';
import { Guitar } from '../../types/guitar';
import {
  cartGuitarIncrement,
  convertToRussianGuitarType,
  existVerticalScroll,
  getBodyScrollTop,
  handleBodyLock,
  isEscapeKey
} from '../../utils';

type PropsType = {
  guitar: Guitar;
  setModal: (arg0: boolean) => void,
  modal: boolean;
  setModalSuccess: (arg0: boolean) => void,
}

function CartAddModal({ guitar, setModal, modal, setModalSuccess }: PropsType): JSX.Element {
  const dispatch = useAppDispatch();
  const cartGuitars = useAppSelector(getCartGuitars);
  const body = document.querySelector('body');

  if (body && existVerticalScroll() && modal) {
    body.dataset.scrollY = `${getBodyScrollTop()}`;
    body.classList.add('body-lock');
    body.style.top = `-${body.dataset.scrollY}px`;
  }

  const onEscKeydown = (event: { key?: string; }) => {
    if (isEscapeKey(event.key)) {
      setModal(false);
      handleBodyLock(body);
      document.removeEventListener('keydown', onEscKeydown);
    }
  };

  const onSubmit = () => {
    dispatch(loadCartGuitars(cartGuitarIncrement(cartGuitars, guitar)));
    setModal(false);
    setModalSuccess(true);
    handleBodyLock(body);
    document.removeEventListener('keydown', onEscKeydown);
  };


  const handleCloseModal = () => {
    setModal(false);
    handleBodyLock(body);
    document.removeEventListener('keydown', onEscKeydown);
  };

  modal && document.addEventListener('keydown', onEscKeydown);

  return (
    <TrapFocus open>
      <div className={`modal ${modal ? 'is-active' : ''}`} tabIndex={-1} aria-modal="true" id='modal--add'>
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal onClick={handleCloseModal} />
          <div className="modal__content">
            <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
            <div className="modal__info"><img className="modal__img" src={guitar.previewImg} srcSet={`${guitar.previewImg.slice(0, -4)}@2x.jpg 2x`} width={67} height={137} alt="Честер bass" />
              <div className="modal__info-wrapper">
                <h3 className="modal__product-name title title--little title--uppercase">{guitar.name}</h3>
                <p className="modal__product-params modal__product-params--margin-11">Артикул: {guitar.vendorCode}</p>
                <p className="modal__product-params">{convertToRussianGuitarType(guitar.type)}, {guitar.stringCount} струнная</p>
                <p className="modal__price-wrapper"><span className="modal__price">Цена:</span><span className="modal__price">{guitar.price} ₽</span></p>
              </div>
            </div>
            <div className="modal__button-container">
              <button
                className="button button--red button--big modal__button modal__button--add"
                onClick={() => onSubmit()}
              >Добавить в корзину
              </button>
            </div>
            <button
              className="modal__close-btn button-cross"
              type="button"
              aria-label="Закрыть"
              data-testid="close-button"
              onClick={handleCloseModal}
            ><span className="button-cross__icon" /><span className="modal__close-btn-interactive-area" />
            </button>
          </div>
        </div>
      </div>
    </TrapFocus>

  );
}

export default CartAddModal;
