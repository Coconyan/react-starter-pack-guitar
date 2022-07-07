import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../../components/cart-item/cart-item';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { AppRoute, PromoCode, PromoCodeDiscount } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setPromoCode } from '../../store/data copy/cart';
import { getCartGuitars, getPromoCode } from '../../store/data copy/selectors';

function CartPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const cartGuitars = useAppSelector(getCartGuitars);
  const promoCode = useAppSelector(getPromoCode);
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
  }, [cartGuitars]);

  const getPromoStatus = () => {
    if (promoInput.length > 0) {
      switch (promoInput.trim().toLowerCase()) {
        case PromoCode.Light:
          setTotalPriceWithPromo(PromoCodeDiscount.Light * totalPrice);
          setPromoValidateSuccess(true);
          setPromoValidateError(false);
          break;
        case PromoCode.Medium:
          setTotalPriceWithPromo(PromoCodeDiscount.Medium * totalPrice);
          setPromoValidateSuccess(true);
          setPromoValidateError(false);
          break;
        case PromoCode.Height:
          setTotalPriceWithPromo(PromoCodeDiscount.Height * totalPrice);
          setPromoValidateSuccess(true);
          setPromoValidateError(false);
          break;
        default:
          setTotalPriceWithPromo(totalPrice);
          setPromoValidateSuccess(false);
          setPromoValidateError(true);
          break;
      }
    } else if (promoCode && promoCode.length > 0) {
      switch (promoCode) {
        case PromoCode.Light:
          setTotalPriceWithPromo(0.95 * totalPrice);
          setPromoValidateSuccess(true);
          setPromoValidateError(false);
          break;
        case PromoCode.Medium:
          setTotalPriceWithPromo(0.9 * totalPrice);
          setPromoValidateSuccess(true);
          setPromoValidateError(false);
          break;
        case PromoCode.Height:
          setTotalPriceWithPromo(0.85 * totalPrice);
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
          <h1 className="title title--bigger page-content__title">Корзина</h1>
          <ul className="breadcrumbs page-content__breadcrumbs page-content__breadcrumbs--on-cart-page">
            <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Root}>Главная</Link>
            </li>
            <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Root}>Каталог</Link>
            </li>
            <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Cart}>Корзина</Link>
            </li>
          </ul>
          <div className="cart">
            {cartGuitars.map((guitar) => (
              <CartItem key={guitar.id} guitar={guitar} />
            ))}
            <div className="cart__footer">
              <div className="cart__coupon coupon">
                <h2 className="title title--little coupon__title">Промокод на скидку</h2>
                <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
                <form
                  className="coupon__form"
                  id="coupon-form"
                >
                  <div className="form-input coupon__input">
                    <label className="visually-hidden">Промокод</label>
                    <input
                      type="text"
                      placeholder="Введите промокод"
                      id="coupon"
                      name="coupon"
                      onChange={(event) => setPromoInput(event.currentTarget.value)}
                    />
                    {promoValidateSuccess && (<p className="form-input__message form-input__message--success">Промокод принят</p>)}
                    {promoValidateError && (<p className="form-input__message form-input__message--error">неверный промокод</p>)}
                  </div>
                  <button
                    className="button button--big coupon__button"
                    type='button'
                    onClick={handleCheckPromo}
                  >Применить
                  </button>
                </form>
              </div>
              <div className="cart__total-info">
                <p className="cart__total-item"><span className="cart__total-value-name">Всего:</span><span className="cart__total-value">{totalPrice} ₽</span></p>
                <p className="cart__total-item"><span className="cart__total-value-name">Скидка:</span><span className={`cart__total-value ${promoValidateSuccess && 'cart__total-value--bonus'}`}>- {totalPrice - totalPriceWithPromo} ₽</span></p>
                <p className="cart__total-item"><span className="cart__total-value-name">К оплате:</span><span className="cart__total-value cart__total-value--payment">{totalPriceWithPromo} ₽</span></p>
                <button className="button button--red button--big cart__order-button">Оформить заказ</button>
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
