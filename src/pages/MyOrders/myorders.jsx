import { useContext } from 'react';
import { Link } from "react-router-dom";

import { ShoppingCartContext } from '../../contexts';
import { OrdersCard } from '../../components/OrdersCard';

function MyOrders() {
  const context = useContext(ShoppingCartContext);

  return (
    <>
      <div className="my-orders-header-container">
        <h1 className="my-orders-header">My Orders</h1>
      </div>
      {context.order.map((order, index) => (
        <Link key={index} to={`/my-orders/${index}`}>
          <OrdersCard 
            totalPrice={order.totalPrice}
            totalProducts={order.totalProducts}
          />
        </Link>
      ))}
    </>
  )
}

export { MyOrders };