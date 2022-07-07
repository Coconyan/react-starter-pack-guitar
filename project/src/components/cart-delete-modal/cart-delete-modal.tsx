import TrapFocus from '@mui/base/TrapFocus';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import {
  useAppDispatch,
  useAppSelector
} from '../../hooks';
import { loadCartGuitars } from '../../store/cart/cart';
import { getCartGuitars } from '../../store/cart/selectors';
import { Guitar } from '../../types/guitar';
import {
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
}

function CartDeleteModal({ guitar, setModal, modal }: PropsType): JSX.Element {
  const dispatch = useAppDispatch();
  const cartGuitars = useAppSelector(getCartGuitars);
  const navigate = useNavigate();
  const body = document.querySelector('body');
  const indexGuitar = cartGuitars.findIndex((cartGuitar) => cartGuitar.id === guitar.id);

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

  const handleCloseModal = () => {
    setModal(false);
    handleBodyLock(body);
    document.removeEventListener('keydown', onEscKeydown);
  };

  const handleDeleteGuitar = () => {
    const cartGuitarWithoutOne = JSON.parse(JSON.stringify(cartGuitars));
    cartGuitarWithoutOne.splice(indexGuitar, 1);
    dispatch(loadCartGuitars(cartGuitarWithoutOne));
    handleCloseModal();
  };

  modal && document.addEventListener('keydown', onEscKeydown);

  return (
    <TrapFocus open>
      <div className={`modal ${modal ? 'is-active' : ''}`} tabIndex={-1} aria-modal="true" id='modal--add'>
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal onClick={handleCloseModal} />
          <div className="modal__content">
            <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
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
                className="button button--small modal__button"
                onClick={() => handleDeleteGuitar()}
              >Удалить товар
              </button>
              <button
                className="button button--black-border button--small modal__button modal__button--right"
                onClick={() => { handleCloseModal(); navigate(AppRoute.Root, { replace: true }); }}
              >Продолжить покупки
              </button>
            </div>
            <button
              className="modal__close-btn button-cross"
              type="button"
              aria-label="Закрыть"
              onClick={handleCloseModal}
              data-testid="close-button"
            ><span className="button-cross__icon" /><span className="modal__close-btn-interactive-area" />
            </button>
          </div>
        </div>
      </div>
    </TrapFocus>

  );
}

export default CartDeleteModal;
