import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../contexts';
import { OrderCard } from '../../components/OrderCard';

function MyOrder() {
  const { order } = useContext(ShoppingCartContext);

  const currentPath = window.location.pathname
  let index = currentPath.substring(currentPath.lastIndexOf('/') + 1)
  if (index === 'last') index = order?.length - 1 

  return (
    <>
      <div className="my-order-header">
        <Link to="/my-orders" className="my-order-icon">
          <ChevronLeftIcon className="chevron-left-icon" />
        </Link>
        <h1>My Order</h1>
      </div>
      <div className='my-order-container'>
        {order?.[index]?.products.map((product) => (
          <OrderCard 
            key={product.id}
            id={product.id}
            title={product.title}
            image={product.image}
            price={product.price}
          />
        ))}
      </div>
    </>
  )
}

export { MyOrder };
