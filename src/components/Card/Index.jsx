import { useContext } from "react";
import { PlusIcon, CheckIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../contexts";
import '../Card/index.css'

const Card = (productData) => {
  const {
    setIsProductInfoOpen,
    setProductToShow,
    cartProducts,
    setCartProducts,
    setIsCheckoutPopUpOpen,
  } = useContext(ShoppingCartContext);

  const handleProductClick = () => {
    setIsCheckoutPopUpOpen(false);
    setIsProductInfoOpen(true);
    setProductToShow(productData);
  };

  const handleAddToCart = (event, productData) => {
    event.stopPropagation();
    setCartProducts([...cartProducts, productData]);
    setIsCheckoutPopUpOpen(true);
    setIsProductInfoOpen(false);
  };

  const isInCart = cartProducts?.filter(product => product.id === productData.id).length > 0;

  return (
    <div
      className="card-container"
      onClick={handleProductClick}
    >
      <figure className="card-image">
        <span className="category-label">
          {productData.category}
        </span>
        <img src={productData.image} alt={productData.title}/>
        <button 
          className="icon-button"
          onClick={isInCart ? undefined : handleAddToCart}
        >
          {isInCart ? <CheckIcon className="icon-button-check" /> : 
          <PlusIcon className="icon-button-plus"/>}
        </button>
      </figure>
      <p className="card-details">
        <span className="card-title">{productData.title}</span>
        <span className="card-price">${productData.price}</span>
      </p>
    </div>
  );
};

export { Card };