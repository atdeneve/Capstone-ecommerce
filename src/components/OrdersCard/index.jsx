// import { ChevronRightIcon, CalendarDaysIcon, ShoppingBagIcon } from '@heroicons/react/24/solid';
// import PropTypes from 'prop-types';

// const OrdersCard = (props) => {
//   const { totalPrice, totalProducts } = props;

//   return (
//     <div className="orders-card-container">
//       <div className="orders-card-details">
//         <div className="orders-card-date">
//           <div>
//             <CalendarDaysIcon className="orders-card-icon" style={{ height: '50px', width: '50px' }} />
//             <span className="orders-card-date"></span>
//           </div>
//           <div>
//             <ShoppingBagIcon className="orders-card-icon" style={{ height: '50px', width: '50px' }}/>
//             <span className="total-product-number">{totalProducts} articles</span>
//           </div>
//         </div>
//         <p>
//           <span className="orders-card-price">${totalPrice}</span>
//           <ChevronRightIcon className="orders-card-chevron" style={{ height: '50px', width: '50px' }}/>
//         </p>
//       </div>

//     </div>
//   )
// }

// OrdersCard.propTypes = {
//   totalPrice: PropTypes.number.isRequired,
//   totalProducts: PropTypes.number.isRequired,
// };

// export { OrdersCard };