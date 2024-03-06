import { useContext } from 'react';
import { Link } from "react-router-dom";
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../contexts';
import { OrderCard } from '../OrderCard/index'
import { totalPrice } from "../../utilities/totalprice"
import '../CheckoutPopUp/index.css'

const CheckoutPopUp = () => {
  const {
    isCheckoutPopUpOpen,
    setIsCheckoutPopUpOpen,
    cartProducts,
    setCartProducts,
    order,
    setOrder,
    setSearchByName,
  } = useContext(ShoppingCartContext);

  const handleDelete = (id) => {
    const filteredProducts = cartProducts.filter((product) => product.id != id);
    setCartProducts(filteredProducts);
  };

  const handleCheckout = () => {
    const orderToAdd = {
      date: '02.27.24',
      products: cartProducts,
      totalProducts: cartProducts.length,
      totalPrice: totalPrice(cartProducts),
    };

  setOrder([...order, orderToAdd]);
  setCartProducts([]);
  setIsCheckoutPopUpOpen(false);
  setSearchByName('');
  }

  return(
    <aside
      className={`checkout-popup${
        isCheckoutPopUpOpen ? "flex" : "hidden"}`}
    >
      <div className="checkout-popup-header">
        <h2 className="checkout-popup-title">My Order</h2>
        <div>
          <XMarkIcon
            className="checkout-popup-close-icon"
            onClick={() => setIsCheckoutPopUpOpen(false)}
          ></XMarkIcon>
        </div>
      </div>
      <div className="checkout-popup-content">
        {cartProducts.map((product) => (
          <OrderCard
            key={product.id}
            id={product.id}
            title={product.title}
            imageUrl={product.image}
            price={product.price}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      <div className="checkout-popup-total-div">
        <p className="checkout-popup-total">
          <span className="checkout-popup-text">Total:</span>
          <span className="checkout-popup-price">
            ${totalPrice(cartProducts)}
          </span>
        </p>
        <Link to="/my-orders/last">
          <button
            className="checkout-popup-button"
            onClick={() => handleCheckout()}
          >
            Checkout
          </button>
        </Link>
      </div>
    </aside>
  );
};

export { CheckoutPopUp };