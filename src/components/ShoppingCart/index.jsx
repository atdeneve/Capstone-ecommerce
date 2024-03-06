import { useContext } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../contexts';
import './index.css';

const ShoppingCart = () => {
  const { cartProducts, setIsCheckoutPopUpOpen, setIsProductInfoOpen } = useContext(ShoppingCartContext);

  const openCheckoutPopUp = () => {
    setIsProductInfoOpen(false);
    setIsCheckoutPopUpOpen(true);
  }

  return (
    <div className="shopping-cart-container" onClick={ () => openCheckoutPopUp()}>
      <ShoppingCartIcon className="shopping-cart-icon"/>
      <div className="cart-items-count">
        {cartProducts.length}
      </div>
    </div>
  )
}

export { ShoppingCart };