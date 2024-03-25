import { useContext } from "react";
import PropTypes from 'prop-types';
import { PlusIcon, CheckIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../contexts";
import '../Card/index.css'

const Card = ({ productData }) => {
  const {
    setIsProductInfoOpen,
    setProductToShow,
    cartProducts,
    setCartProducts,
    setIsCheckoutPopUpOpen,
    fetchSingleProduct,
  } = useContext(ShoppingCartContext);

  const handleProductClick = () => {
    setIsCheckoutPopUpOpen(false);
    setIsProductInfoOpen(true);
    setProductToShow(productData);
  };

  const handleAddToCart = async (event) => {
    event.stopPropagation();
    if(!productData) {
      console.log("Error: Product Data is not defined");
      return;
    }
    console.log('Product data:', productData);
    //fetch based off id 
    await fetchSingleProduct(productData.id);
    console.log(productData.id);
    const isInCart = cartProducts.some(product => product.id === productData.id);
    console.log(isInCart);
    if (!isInCart) {
      //add product to cart
      setCartProducts([...cartProducts, productData]);
      setIsProductInfoOpen(false);
    }
  };

  if(!productData) {
    return null;
  }

  const isInCart = cartProducts?.some(product => product.id === productData.id);

  return (
    <div
      className="card-container"
      onClick={handleProductClick}
    >
      <figure className="card-image-container">
        <span className="category-label">
          {productData.category}
        </span>
        <img className="card-image" src={productData.image} alt={productData.title}/>
      </figure>
      <p className="card-details">
        <span className="card-title">{productData.title}</span>
        <span className="card-price">${productData.price}</span>
      </p>
      <button 
          className="icon-button"
          onClick={isInCart ? undefined : handleAddToCart}
        >
          {isInCart ? <CheckIcon className="icon-button-check" /> : 
          <PlusIcon className="icon-button-plus"
          />}
        </button>
    </div>
  );
};

Card.propTypes = {
  productData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired
};

export { Card };