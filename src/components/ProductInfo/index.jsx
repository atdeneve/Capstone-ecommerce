import { XMarkIcon } from "@heroicons/react/24/solid";
import './index.css';

import { useContext } from 'react';
import { ShoppingCartContext } from '../../contexts';

const ProductInfo = () => {
  const { productToShow, isProductInfoOpen, setIsProductInfoOpen } = useContext(ShoppingCartContext);

  return (
    <aside 
      className={`product-info-container ${isProductInfoOpen ? 'flex' : ''} `}>
        <div className="product-info-header">
          <h2 className="product-info-title">Detail</h2>
          <XMarkIcon 
            onClick={ () => setIsProductInfoOpen(false)}
            className="product-info-close-icon"/>
        </div>
      <figure className="product-info-image">
        <img 
          className="product-info-img"
          src={productToShow.image}
          alt={productToShow.title}
        />
      </figure>
      <div className="product-info-details">
        <span className="product-info-price">{productToShow.price}</span>
        <span className="product-info-name">{productToShow.title}</span>
        <span className="product-info-description">{productToShow.description}</span>
      </div>
    </aside>
  )
}

export { ProductInfo }