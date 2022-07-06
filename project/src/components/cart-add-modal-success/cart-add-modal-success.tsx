import TrapFocus from '@mui/base/TrapFocus';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import {
  existVerticalScroll,
  getBodyScrollTop,
  handleBodyLock,
  isEscapeKey
} from '../../utils';

type PropsType = {
  setModal: (arg0: boolean) => void,
  modal: boolean;
}

function CartAddModalSuccess({ setModal, modal }: PropsType): JSX.Element {
  const navigate = useNavigate();
  const body = document.querySelector('body');

  if (body && existVerticalScroll() && modal) {
    body.dataset.scrollY = `${getBodyScrollTop()}`;
    body.classList.add('body-lock');
    body.style.top = `-${body.dataset.scrollY}px`;
  }

  const onEscKeydown = (event: { key?: string; }) => {
    if (isEscapeKey(event.key)) {
      handleBodyLock(body);
      document.removeEventListener('keydown', onEscKeydown);
    }
  };

  const handleCloseModal = () => {
    setModal(false);
    handleBodyLock(body);
  };

  modal && document.addEventListener('keydown', onEscKeydown);

  return (
    <TrapFocus open>
      <div className={`modal ${modal ? 'is-active' : ''} modal--success`} tabIndex={-1} aria-modal="true" id='modal--success'>
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal onClick={handleCloseModal} />
          <div className="modal__content">
            <svg className="modal__icon" width={26} height={20} aria-hidden="true">
              <use xlinkHref="#icon-success" />
            </svg>
            <p className="modal__message">Товар успешно добавлен в корзину</p>
            <div className="modal__button-container modal__button-container--add">
              <button
                className="button button--small modal__button"
                onClick={() => {handleCloseModal();navigate(AppRoute.Cart, { replace: true });}}
              >Перейти в корзину
              </button>
              <button
                className="button button--black-border button--small modal__button modal__button--right"
                onClick={() => {handleCloseModal();navigate(AppRoute.Root, { replace: true });}}
              >Продолжить покупки
              </button>
            </div>
            <button
              className="modal__close-btn button-cross"
              type="button" aria-label="Закрыть"
              onClick={handleCloseModal}
            >
              <span className="button-cross__icon" /><span className="modal__close-btn-interactive-area" />
            </button>
          </div>
        </div>
      </div>
    </TrapFocus>

  );
}

export default CartAddModalSuccess;
