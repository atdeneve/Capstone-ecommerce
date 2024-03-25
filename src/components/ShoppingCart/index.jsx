import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../contexts';
import './index.css';

const ShoppingCart = () => {
  const { cartProducts, setIsProductInfoOpen } = useContext(ShoppingCartContext);
  const navigate = useNavigate();

  const openCheckoutPage = () => {
    setIsProductInfoOpen(false);
    navigate('/checkout');
  }

  return (
    <div className="shopping-cart-container" onClick={ () => openCheckoutPage()}>
      <ShoppingCartIcon className="shopping-cart-icon"/>
      <div className="cart-items-count">
        {cartProducts.length}
      </div>
    </div>
  )
}

export { ShoppingCart };