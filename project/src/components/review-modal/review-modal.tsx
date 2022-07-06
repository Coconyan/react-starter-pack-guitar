import TrapFocus from '@mui/base/TrapFocus';
import {
  FormEvent,
  useState
} from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addNewCommentAction } from '../../store/api-actions';
import { loadCurrentGuitarComments } from '../../store/data/data';
import { getCurrentGuitarComments } from '../../store/data/selectors';
import { CommentPost } from '../../types/comment';
import {
  convertCommentPostToComment,
  existVerticalScroll,
  getBodyScrollTop,
  handleBodyLock,
  isEscapeKey
} from '../../utils';

type PropsType = {
  guitarName: string,
  guitarId: number,
  setModal: (arg0: boolean) => void,
  modal: boolean,
}

function ReviewModal({ guitarName, guitarId, setModal, modal }: PropsType): JSX.Element {
  const currentGuitarComments = useAppSelector(getCurrentGuitarComments);
  const dispatch = useAppDispatch();
  const [userName, setName] = useState('');
  const [rating, setRating] = useState('');
  const [advantage, setAdvantage] = useState('');
  const [disadvantage, setDisadvantage] = useState('');
  const [comment, setComment] = useState('');
  const [validate, setValidate] = useState(false);
  const body = document.querySelector('body');

  if (body && existVerticalScroll() && modal) {
    body.dataset.scrollY = `${getBodyScrollTop()}`;
    body.classList.add('body-lock');
    body.style.top = `-${body.dataset.scrollY}px`;
  }

  const onSubmit = (commentData: CommentPost) => {
    dispatch(addNewCommentAction(commentData));
    const currentGuitarCommentsWithNewComment = currentGuitarComments.slice();
    currentGuitarCommentsWithNewComment.unshift(convertCommentPostToComment(commentData));
    dispatch(loadCurrentGuitarComments(currentGuitarCommentsWithNewComment));
    setModal(false);
    handleBodyLock(body);
    setValidate(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidate(true);

    if (userName.length !== 0 && rating.length !== 0 && advantage.length !== 0 && disadvantage.length !== 0 && comment.length !== 0) {
      onSubmit({
        guitarId: guitarId,
        userName: userName,
        rating: Number(rating),
        advantage: advantage,
        disadvantage: disadvantage,
        comment: comment,
      });

      setName('');
      setRating('');
      setAdvantage('');
      setDisadvantage('');
      setComment('');
      event.currentTarget.reset();
    }
  };

  const handleCloseModal = () => {
    document.removeEventListener('keydown', onEscKeydown);
    handleBodyLock(body);
    setModal(false);
  };

  const onEscKeydown = (event: { key?: string; }) => {
    if (isEscapeKey(event.key)) {
      setModal(false);
      document.removeEventListener('keydown', onEscKeydown);
      handleBodyLock(body);
    }
  };

  modal && document.addEventListener('keydown', onEscKeydown);

  return (
    <TrapFocus open>
      <div className={`modal ${modal ? 'is-active' : ''} modal--review`} tabIndex={-1} aria-modal="true">
        <div className="modal__wrapper">
          <div
            className="modal__overlay"
            onClick={handleCloseModal}
            data-close-modal
          />
          <div className="modal__content">
            <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
            <h3 className="modal__product-name title title--medium-20 title--uppercase">{guitarName}</h3>
            <form
              className="form-review"
              onSubmit={handleSubmit}
            >
              <div className="form-review__wrapper">
                <div className="form-review__name-wrapper">
                  <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>
                  <input onChange={(event) => setName(event.target.value)} className="form-review__input form-review__input--name" id="user-name" type="text" autoComplete="off" />
                  {(<p className={`form-review__warning ${(userName.length !== 0 || !validate) ? 'visibility-hidden' : ''}`}>Заполните поле</p>)}
                </div>
                <div><span className="form-review__label form-review__label--required">Ваша Оценка</span>
                  <div className="rate rate--reverse">
                    <input onChange={(event) => setRating(event.target.value)} className="visually-hidden" checked={rating === '5'} id="star-5" data-testid="star-5" name="rate" type="radio" defaultValue={5} />
                    <label className="rate__label" htmlFor="star-5" title="Отлично" />
                    <input onChange={(event) => setRating(event.target.value)} className="visually-hidden" checked={rating === '4'} id="star-4" name="rate" type="radio" defaultValue={4} />
                    <label className="rate__label" htmlFor="star-4" title="Хорошо" />
                    <input onChange={(event) => setRating(event.target.value)} className="visually-hidden" checked={rating === '3'} id="star-3" name="rate" type="radio" defaultValue={3} />
                    <label className="rate__label" htmlFor="star-3" title="Нормально" />
                    <input onChange={(event) => setRating(event.target.value)} className="visually-hidden" checked={rating === '2'} id="star-2" name="rate" type="radio" defaultValue={2} />
                    <label className="rate__label" htmlFor="star-2" title="Плохо" />
                    <input onChange={(event) => setRating(event.target.value)} className="visually-hidden" checked={rating === '1'} id="star-1" name="rate" type="radio" defaultValue={1} />
                    <label className="rate__label" htmlFor="star-1" title="Ужасно" />
                    {(<p className={`rate__message ${(rating.length !== 0 || !validate) ? 'visibility-hidden' : ''}`}>Поставьте оценку</p>)}
                  </div>
                </div>
              </div>
              <label className="form-review__label form-review__label--required" htmlFor="adv">Достоинства</label>
              <input onChange={(event) => setAdvantage(event.target.value)} className="form-review__input" id="adv" type="text" autoComplete="off" />
              {(<p className={`form-review__warning ${(advantage.length !== 0 || !validate) ? 'visibility-hidden' : ''}`}>Заполните поле</p>)}
              <label className="form-review__label form-review__label--required" htmlFor="disadv">Недостатки</label>
              <input onChange={(event) => setDisadvantage(event.target.value)} className="form-review__input" id="disadv" type="text" autoComplete="off" />
              {(<p className={`form-review__warning ${(disadvantage.length !== 0 || !validate) ? 'visibility-hidden' : ''}`}>Заполните поле</p>)}
              <label className="form-review__label form-review__label--required" htmlFor="comment">Комментарий</label>
              <textarea onChange={(event) => setComment(event.target.value)} className="form-review__input form-review__input--textarea" id="comment" rows={10} autoComplete="off" defaultValue={''} />
              {(<p className={`form-review__warning ${(comment.length !== 0 || !validate) ? 'visibility-hidden' : ''}`}>Заполните поле</p>)}
              <button className="button button--medium-20 form-review__button" type="submit">Отправить отзыв</button>
            </form>
            <button
              className="modal__close-btn button-cross"
              type="button" aria-label="Закрыть"
              onClick={handleCloseModal}
            ><span className="button-cross__icon" /><span className="modal__close-btn-interactive-area" />
            </button>
          </div>
        </div>
      </div >
    </TrapFocus>
  );
}

export default ReviewModal;
