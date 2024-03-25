import { XMarkIcon } from "@heroicons/react/24/solid";
import { useContext } from 'react';
import { ShoppingCartContext } from '../../contexts/index';
import PropTypes from 'prop-types'; //import prop types
import '../OrderCard/index.css';

const OrderCard = (props) => {
  const { updateQuantity, cartProductQuantity } = useContext(ShoppingCartContext);  
  const { id, title, imageUrl, price, handleDelete } = props;

  const product = cartProductQuantity.find((product) => product.id === id);

  console.log(`Ordercard with id ${id} is rendered`);

  return (
    <div className="order-card-container">
      <div className="order-card-details">
        <figure className="order-card-image-container">
          <img
            className="order-card-image"
            src={imageUrl}
            alt={title}
          />
        </figure>
        <p className="order-card-title">{title}</p>
      </div>
      <div className="order-card-details">
        <div className="order-card-quantity-container">
          <button onClick={() => updateQuantity(id, -1)}> - </button>
          <input 
            className="order-card-quantity-input"
            type="number"
            min="1"
            value={product ? product.quantity : 1}
            readOnly
          />
          <button onClick={() => updateQuantity(id, +1)}> + </button>
        </div>
        <p className="order-card-price">{price}</p>
        {handleDelete && (
          <XMarkIcon 
            onClick={() => handleDelete(id)}
            className="order-card-delete-icon"
          />
        )}
      </div>
    </div>
  )
}

OrderCard.propTypes = { 
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  handleDelete: PropTypes.func,
}

export { OrderCard };