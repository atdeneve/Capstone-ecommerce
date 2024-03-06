import { XMarkIcon } from "@heroicons/react/24/solid";
import PropTypes from 'prop-types'; //import prop types
import '../OrderCard/index.css'

const OrderCard = (props) => {
  const { id, title, imageUrl, price, handleDelete } = props;

  console.log(`Ordercard with id ${id} is rendered`);

  return (
    <div className="order-card-container">
      <div className="order-card-details">
        <figure className="order-card-image">
          <img
            src={imageUrl}
            alt={title}
          />
        </figure>
        <p className="order-card-title">{title}</p>
      </div>
      <div className="order-card-details">
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