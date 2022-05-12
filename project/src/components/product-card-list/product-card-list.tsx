import { Guitars } from '../../types/guitar';
import ProductCard from '../product-card/product-card';

type PropsType = {
  guitars: Guitars;
}

function ProductCardList({ guitars }: PropsType): JSX.Element {
  return (
    <div className="cards catalog__cards">
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
