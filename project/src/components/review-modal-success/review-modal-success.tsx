import {
  useAppDispatch,
  useAppSelector
} from '../../hooks';
import { fetchCurrentGuitarCommentsAction } from '../../store/api-actions';
import { setCommentSend } from '../../store/data/data';
import { getCommentSendStatus } from '../../store/data/selectors';
import { isEscapeKey } from '../../utils';

type PropsType = {
  guitarId: number;
}

function ReviewModalSuccess({ guitarId }: PropsType): JSX.Element {
  const dispatch = useAppDispatch();
  const commentSendStatus = useAppSelector(getCommentSendStatus);

  const handleModalSuccessClose = () => {
    dispatch(setCommentSend(false));
    dispatch(fetchCurrentGuitarCommentsAction(guitarId));
  };

  const onEscKeydown = (event: { key?: string; }) => {
    if (isEscapeKey(event.key)) {
      handleModalSuccessClose();
      document.removeEventListener('keydown', onEscKeydown);
    }
  };

  commentSendStatus && document.addEventListener('keydown', onEscKeydown);

  return (
    <div className="modal is-active modal--success modal-for-ui-kit">
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal />
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

  );
}

export default ReviewModalSuccess;
