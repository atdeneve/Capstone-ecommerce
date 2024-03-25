import { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCartContext } from '../../contexts';
import { OrderCard } from '../OrderCard/index';
// import { totalPrice } from "../../utilities/totalprice";
import { XMarkIcon } from "@heroicons/react/24/solid";

const CheckoutPage = () => {
  const {
    cartProducts,
    setCartProducts,
    order,
    setOrder,
    setSearchByName,
    totalPrice,
    clearCart,
    cartProductQuantity,
    calculateTotalPrice,
    setTotalPrice,
  } = useContext(ShoppingCartContext);

  const navigate = useNavigate();

  const handleDelete = (id) => {
    const filteredProducts = cartProducts.filter((product) => product.id !== id);
    setCartProducts(filteredProducts);
  };

  useEffect(() => {
    const newTotalPrice = calculateTotalPrice(cartProducts);
    setTotalPrice(newTotalPrice);
  }, [cartProducts]); 

  const handleCheckout = () => {
    const orderToAdd = {
      date: '02.27.24',
      products: cartProducts,
      totalProducts: cartProducts.length,
      totalPrice: totalPrice,
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
      </div>
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
        <button className="clear-cart" onClick={clearCart}></button>
        <Link to="/shipping-form">
          <button className="checkout-button" onClick={handleCheckout}>
            Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export { CheckoutPage };