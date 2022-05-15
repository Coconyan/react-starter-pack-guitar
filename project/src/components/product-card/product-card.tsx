import { Guitar } from '../../types/guitar';

type PropsType = {
  guitar: Guitar;
}

function ProductCard({ guitar }: PropsType): JSX.Element {
  return (
    <div className="product-card"><img src={guitar.previewImg} srcSet={`${guitar.previewImg} 2x`} width={75} height={190} alt={guitar.name} />
      {/* todo Путь изображения??? srcSet */}
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {[1, 2, 3, 4, 5].map((rate) => {
            if (rate <= guitar.rating) {
              return (
                <svg key={rate} width={12} height={11} aria-hidden="true">
                  <use xlinkHref="#icon-full-star" />
                </svg>
              );
            }
            return (
              <svg key={rate} width={12} height={11} aria-hidden="true">
                <use xlinkHref="#icon-star" />
              </svg>
            );
          })}
          {/* todo Рейтинг */}
          <p className="visually-hidden">Рейтинг: Хорошо</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{guitar.stringCount}</p>
        </div>
        <p className="product-card__title">{guitar.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{guitar.price} ₽
        </p>
      </div>
      <div className="product-card__buttons"><a className="button button--mini" href="todo#">Подробнее</a><a className="button button--red button--mini button--add-to-cart" href="todo#">Купить</a>
      </div>
    </div>
  );
}

export default ProductCard;
