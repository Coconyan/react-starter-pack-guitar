import dayjs from 'dayjs';
import { Comments } from '../../types/comment';
import Rating from '../rating/rating';
import 'dayjs/locale/ru';
import { convertToRussianRating } from '../../utils';

type PropsType = {
  reviews: Comments;
}

function ReviewsList({ reviews }: PropsType): JSX.Element {
  dayjs.locale('ru');

  return (
    <>
      {reviews.map((review) => (
        <div key={review.id} className="review">
          <div className="review__wrapper">
            <h4 className="review__title review__title--author title title--lesser">{review.userName}</h4><span className="review__date">{dayjs(review.createAt).format('D MMMM')}</span>
          </div>
          <div className="rate review__rating-panel">
            <Rating rating={review.rating} width={16} height={16} />
            <p className="visually-hidden">Оценка: {convertToRussianRating(review.rating)}</p>
          </div>
          <h4 className="review__title title title--lesser">Достоинства:</h4>
          <p className="review__value">{review.advantage}</p>
          <h4 className="review__title title title--lesser">Недостатки:</h4>
          <p className="review__value">{review.disadvantage}</p>
          <h4 className="review__title title title--lesser">Комментарий:</h4>
          <p className="review__value">{review.comment}</p>
        </div>
      ))}
    </>
  );
}

export default ReviewsList;
