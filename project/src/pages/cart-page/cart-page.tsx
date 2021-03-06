import {
  useEffect,
  useState
} from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../../components/cart-item/cart-item';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import {
  AppRoute,
  PromoCode
} from '../../const';
import {
  useAppDispatch,
  useAppSelector
} from '../../hooks';
import { fetchPromoCodeDiscount } from '../../store/api-actions';
import { setPromoCode } from '../../store/cart/cart';
import {
  getCartGuitars,
  getDiscount,
  getPromoCode
} from '../../store/cart/selectors';
import { numberWithSpaces } from '../../utils';

function CartPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const cartGuitars = useAppSelector(getCartGuitars);
  const promoCode = useAppSelector(getPromoCode);
  const discount = useAppSelector(getDiscount);
  const [promoValidateSuccess, setPromoValidateSuccess] = useState(false);
  const [promoValidateError, setPromoValidateError] = useState(false);
  const [promoInput, setPromoInput] = useState('');
  const [totalPriceWithPromo, setTotalPriceWithPromo] = useState(0);

  let totalPrice = 0;
  cartGuitars.forEach((guitar) => {
    guitar.cartCount ? totalPrice += guitar.price * guitar.cartCount : totalPrice += guitar.price;
  });

  useEffect(() => {
    getPromoStatus();
  }, [cartGuitars, discount]);

  const getPromoStatus = () => {
    let correctPromo = '';

    if (promoInput.length > 0) {
      correctPromo = promoInput.trim().toLowerCase();
    } else if (promoCode && promoCode.length > 0) {
      correctPromo = promoCode;
    }

    if (correctPromo && correctPromo.length > 0) {
      switch (correctPromo) {
        case PromoCode.Light:
          dispatch(fetchPromoCodeDiscount(correctPromo));
          setTotalPriceWithPromo((1 - (discount/100)) * totalPrice);
          setPromoValidateSuccess(true);
          setPromoValidateError(false);
          break;
        case PromoCode.Medium:
          dispatch(fetchPromoCodeDiscount(correctPromo));
          setTotalPriceWithPromo((1 - (discount/100)) * totalPrice);
          setPromoValidateSuccess(true);
          setPromoValidateError(false);
          break;
        case PromoCode.Height:
          dispatch(fetchPromoCodeDiscount(correctPromo));
          setTotalPriceWithPromo((1 - (discount/100)) * totalPrice);
          setPromoValidateSuccess(true);
          setPromoValidateError(false);
          break;
        default:
          setTotalPriceWithPromo(totalPrice);
          setPromoValidateSuccess(false);
          setPromoValidateError(true);
          break;
      }
    } else {
      setTotalPriceWithPromo(totalPrice);
    }
  };

  const handleCheckPromo = () => {
    dispatch(setPromoCode(promoInput.trim().toLowerCase()));
    getPromoStatus();
  };

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="title title--bigger page-content__title">??????????????</h1>
          <ul className="breadcrumbs page-content__breadcrumbs page-content__breadcrumbs--on-cart-page">
            <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Root}>??????????????</Link>
            </li>
            <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Root}>??????????????</Link>
            </li>
            <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Cart}>??????????????</Link>
            </li>
          </ul>
          <div className="cart">
            {cartGuitars.map((guitar) => (
              <CartItem key={guitar.id} guitar={guitar} />
            ))}
            <div className="cart__footer">
              <div className="cart__coupon coupon">
                <h2 className="title title--little coupon__title">???????????????? ???? ????????????</h2>
                <p className="coupon__info">?????????????? ???????? ????????????????, ???????? ???? ?? ?????? ????????.</p>
                <form
                  className="coupon__form"
                  id="coupon-form"
                >
                  <div className="form-input coupon__input">
                    <label className="visually-hidden">????????????????</label>
                    <input
                      type="text"
                      placeholder="?????????????? ????????????????"
                      id="coupon"
                      name="coupon"
                      onChange={(event) => setPromoInput(event.currentTarget.value)}
                    />
                    {promoValidateSuccess && (<p className="form-input__message form-input__message--success">???????????????? ????????????</p>)}
                    {promoValidateError && (<p className="form-input__message form-input__message--error">???????????????? ????????????????</p>)}
                  </div>
                  <button
                    className="button button--big coupon__button"
                    type='button'
                    onClick={handleCheckPromo}
                  >??????????????????
                  </button>
                </form>
              </div>
              <div className="cart__total-info">
                <p className="cart__total-item"><span className="cart__total-value-name">??????????:</span><span className="cart__total-value">{numberWithSpaces(totalPrice)} ???</span></p>
                <p className="cart__total-item"><span className="cart__total-value-name">????????????:</span><span className={`cart__total-value ${promoValidateSuccess && 'cart__total-value--bonus'}`}>{promoValidateSuccess && '- '}{totalPrice - totalPriceWithPromo} ???</span></p>
                <p className="cart__total-item"><span className="cart__total-value-name">?? ????????????:</span><span className="cart__total-value cart__total-value--payment">{numberWithSpaces(totalPriceWithPromo)} ???</span></p>
                <button className="button button--red button--big cart__order-button">???????????????? ??????????</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>

  );
}

export default CartPage;
