import { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { OrderCard } from '../OrderCard/index';
import { ShoppingCartContext } from '../../contexts/index';
// import { totalPrice } from "../../utilities/totalprice";
import { XMarkIcon } from "@heroicons/react/24/solid";
import './index.css'

const CheckoutPage = () => {
  const {
    cartProducts,
    setCartProducts,
    order,
    setOrder,
    setSearchByName,
    clearCart,
    calculateTotalPrice,
    cartProductQuantity,
  } = useContext(ShoppingCartContext);

  const navigate = useNavigate();

  const handleDelete = (id) => {
    const filteredProducts = cartProducts.filter((product) => product.id !== id);
    setCartProducts(filteredProducts);
  };

  const totalPrice = calculateTotalPrice(cartProducts, cartProductQuantity);

  const handleCheckout = () => {
    const orderToAdd = {
      date: '02.27.24',
      products: cartProducts,
      totalProducts: cartProducts.length,
      totalPrice: totalPrice(cartProducts),
    };

    setOrder([...order, orderToAdd]);
    setCartProducts([]);
    setSearchByName('');

    navigate('/shipping-form')
  }

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h2 className="checkout-title">My Order</h2>
      <div className="checkout-content">
        {cartProducts.map((product) => (
          <div key={product.id} className="checkout-product">
            <OrderCard
              key={product.id}
              id={product.id}
              title={product.title}
              imageUrl={product.image}
              price={product.price}
            />
            <XMarkIcon 
              className="checkout-delete-icon"
              onClick={() => handleDelete(product.id)}
              style={{ width: '30px', height: '30px'} }
            />
          </div>
        ))}
      </div>
      <div className="checkout-total">
        <p className="checkout-total-text">
          <span>Total:</span>
          <span>${totalPrice}</span>
        </p>
        <div className='btn-container'>
          <button className="clear-cart" onClick={clearCart}>Clear Cart</button>
          <br></br>
          <Link to="/shipping-form">
            <button className="checkout-button" onClick={handleCheckout}>
              Checkout
            </button>
        </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export { CheckoutPage };