import { Guitars } from '../../types/guitar';
import ProductCard from '../product-card/product-card';

type PropsType = {
  guitars: Guitars;
}

function ProductCardList({ guitars }: PropsType): JSX.Element {
  if (guitars.length === 0) {
    return (<h1>По вашему запросу ничего не найдено</h1>);
  }

  return (
    <div className="cards catalog__cards" data-testid="favorites-list">
      {guitars.map((guitar) => (
        <ProductCard
          key={guitar.id}
          guitar={guitar}
        />
      ))}
    </div>
  );
}

export default ProductCardList;
