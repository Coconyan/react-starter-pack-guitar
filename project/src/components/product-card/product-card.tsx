import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCurrentGuitarCommentsCardAction } from '../../store/api-actions';
import { setGuitarsComments } from '../../store/data/data';
import { getGuitarsComments } from '../../store/data/selectors';
import { Comment } from '../../types/comment';
import { Guitar } from '../../types/guitar';
import { convertToRussianRating } from '../../utils';
import Rating from '../rating/rating';

type PropsType = {
  guitar: Guitar;
}

function ProductCard({ guitar }: PropsType): JSX.Element {
  const dispatch = useAppDispatch();
  const guitarsComments = useAppSelector(getGuitarsComments);
  const currentGuitarComments: Comment[] = [];

  guitarsComments.forEach((comments) => {
    comments.forEach((comment) => {
      if (comment.guitarId === guitar.id) {
        currentGuitarComments.push(comment);
      }
    });
  });

  useEffect(() => {
    dispatch(setGuitarsComments([]));
    dispatch(fetchCurrentGuitarCommentsCardAction(guitar.id));
  }, [dispatch, guitar.id]);

  return (
    <div className="product-card"><img src={guitar.previewImg} srcSet={`${guitar.previewImg}@2x.jpg 2x`} width={75} height={190} alt={guitar.name} />
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <Rating rating={guitar.rating} />
          <p className="visually-hidden">Рейтинг: {convertToRussianRating(guitar.rating)}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{currentGuitarComments.length}</p>
        </div>
        <p className="product-card__title">{guitar.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{guitar.price} ₽
        </p>
      </div>
      <div className="product-card__buttons"><Link className="button button--mini" to={`${AppRoute.Product}/${guitar.id}`}>Подробнее</Link><a className="button button--red button--mini button--add-to-cart" href="todo#">Купить</a>
      </div>
    </div>
  );
}

export default ProductCard;
