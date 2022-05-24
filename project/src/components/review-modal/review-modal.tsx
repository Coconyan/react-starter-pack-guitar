// import { createFocusTrap } from 'focus-trap';
import { FormEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { addNewCommentAction } from '../../store/api-actions';
import { CommentPost } from '../../types/comment';
import { existVerticalScroll, getBodyScrollTop, handleBodyLock } from '../../utils';

type PropsType = {
  guitarName: string,
  guitarId: number,
  setModal: (arg0: boolean) => void,
  modal: boolean,
}

function ReviewModal({ guitarName, guitarId, setModal, modal }: PropsType): JSX.Element {
  const dispatch = useAppDispatch();
  const [userName, setName] = useState('');
  const [rating, setRating] = useState('');
  const [advantage, setAdvantage] = useState('');
  const [disadvantage, setDisadvantage] = useState('');
  const [comment, setComment] = useState('');
  const body = document.querySelector('body');
  // const modalFocusTrap = createFocusTrap('.modal');

  // modal && modalFocusTrap?.activate();
  if (body && existVerticalScroll() && modal) {
    body.dataset.scrollY = `${getBodyScrollTop()}`;
    body.classList.add('body-lock');
    body.style.top = `-${body.dataset.scrollY}px`;
  }

  const onSubmit = (commentData: CommentPost) => {
    dispatch(addNewCommentAction(commentData));
    setModal(false);
    handleBodyLock(body);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userName.length !== 0 && rating.length !== 0 && advantage.length !== 0 && disadvantage.length !== 0 && comment.length !== 0) {
      onSubmit({
        guitarId: guitarId,
        userName: userName,
        rating: Number(rating),
        advantage: advantage,
        disadvantage: disadvantage,
        comment: comment,
      });
    }

    setName('');
    setRating('');
    setAdvantage('');
    setDisadvantage('');
    setComment('');
    event.currentTarget.reset();
  };

  const handleCloseModal = () => {
    setModal(false);
    handleBodyLock(body);
  };

  return (
    <div className={`modal ${modal ? 'is-active' : ''} modal--review modal-for-ui-kit`} tabIndex={-1}>
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          onClick={() => handleCloseModal()}
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
                {userName.length === 0 && (<p className="form-review__warning">Заполните поле</p>)}
              </div>
              <div><span className="form-review__label form-review__label--required">Ваша Оценка</span>
                <div className="rate rate--reverse">
                  <input onChange={(event) => setRating(event.target.value)} className="visually-hidden" id="star-5" data-testid="star-5" name="rate" type="radio" defaultValue={5} />
                  <label className="rate__label" htmlFor="star-5" title="Отлично" />
                  <input onChange={(event) => setRating(event.target.value)} className="visually-hidden" id="star-4" name="rate" type="radio" defaultValue={4} />
                  <label className="rate__label" htmlFor="star-4" title="Хорошо" />
                  <input onChange={(event) => setRating(event.target.value)} className="visually-hidden" id="star-3" name="rate" type="radio" defaultValue={3} />
                  <label className="rate__label" htmlFor="star-3" title="Нормально" />
                  <input onChange={(event) => setRating(event.target.value)} className="visually-hidden" id="star-2" name="rate" type="radio" defaultValue={2} />
                  <label className="rate__label" htmlFor="star-2" title="Плохо" />
                  <input onChange={(event) => setRating(event.target.value)} className="visually-hidden" id="star-1" name="rate" type="radio" defaultValue={1} />
                  <label className="rate__label" htmlFor="star-1" title="Ужасно" />
                  {rating.length === 0 && (<p className="rate__message">Поставьте оценку</p>)}
                </div>
              </div>
            </div>
            <label className="form-review__label form-review__label--required" htmlFor="adv">Достоинства</label>
            <input onChange={(event) => setAdvantage(event.target.value)} className="form-review__input" id="adv" type="text" autoComplete="off" />
            {advantage.length === 0 && (<p className="form-review__warning">Заполните поле</p>)}
            <label className="form-review__label form-review__label--required" htmlFor="disadv">Недостатки</label>
            <input onChange={(event) => setDisadvantage(event.target.value)} className="form-review__input" id="disadv" type="text" autoComplete="off" />
            {disadvantage.length === 0 && (<p className="form-review__warning">Заполните поле</p>)}
            <label className="form-review__label form-review__label--required" htmlFor="comment">Комментарий</label>
            <textarea onChange={(event) => setComment(event.target.value)} className="form-review__input form-review__input--textarea" id="comment" rows={10} autoComplete="off" defaultValue={''} />
            {comment.length === 0 && (<p className="form-review__warning">Заполните поле</p>)}
            <button className="button button--medium-20 form-review__button" type="submit">Отправить отзыв</button>
          </form>
          <button
            className="modal__close-btn button-cross"
            type="button" aria-label="Закрыть"
            onClick={() => handleCloseModal()}
          ><span className="button-cross__icon" /><span className="modal__close-btn-interactive-area" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;
