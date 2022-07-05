// import { createFocusTrap } from 'focus-trap';
import TrapFocus from '@mui/base/TrapFocus';
import {
  useAppDispatch,
  useAppSelector
} from '../../hooks';
import { setCommentSend } from '../../store/data/data';
import { getCommentSendStatus } from '../../store/data/selectors';
import {
  existVerticalScroll,
  getBodyScrollTop,
  handleBodyLock,
  isEscapeKey
} from '../../utils';

type PropsType = {
  guitarId: number;
}

function ReviewModalSuccess({ guitarId }: PropsType): JSX.Element {
  const dispatch = useAppDispatch();
  const commentSendStatus = useAppSelector(getCommentSendStatus);
  const body = document.querySelector('body');
  // const modalFocusTrap = createFocusTrap('.modal--success');

  if (body && existVerticalScroll() && commentSendStatus) {
    body.dataset.scrollY = `${getBodyScrollTop()}`;
    body.classList.add('body-lock');
    body.style.top = `-${body.dataset.scrollY}px`;
  }

  const handleModalSuccessClose = () => {
    dispatch(setCommentSend(false));
    handleBodyLock(body);
  };

  const onEscKeydown = (event: { key?: string; }) => {
    if (isEscapeKey(event.key)) {
      handleModalSuccessClose();
      document.removeEventListener('keydown', onEscKeydown);
    }
  };

  commentSendStatus && document.addEventListener('keydown', onEscKeydown);
  // commentSendStatus && setTimeout(() => modalFocusTrap?.activate(), 50);

  return (
    <TrapFocus open >
      <div className={`modal ${commentSendStatus ? 'is-active' : ''} modal--success`} tabIndex={-1} aria-modal="true" id='modal--success'>
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal onClick={() => handleModalSuccessClose()} />
          <div className="modal__content">
            <svg className="modal__icon" width={26} height={20} aria-hidden="true">
              <use xlinkHref="#icon-success" />
            </svg>
            <p className="modal__message">Спасибо за ваш отзыв!</p>
            <div className="modal__button-container modal__button-container--review">
              <button
                className="button button--small modal__button modal__button--review"
                onClick={() => handleModalSuccessClose()}
              >К покупкам!
              </button>
            </div>
            <button
              className="modal__close-btn button-cross"
              type="button"
              aria-label="Закрыть"
              onClick={() => handleModalSuccessClose()}
            >
              <span className="button-cross__icon" /><span className="modal__close-btn-interactive-area" />
            </button>
          </div>
        </div>
      </div>
    </TrapFocus>

  );
}

export default ReviewModalSuccess;
