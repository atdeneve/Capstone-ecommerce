// import { useContext } from 'react';

// import { useRoutes, Navigate, BrowserRouter } from 'react-router-dom';
// import {
//   ShoppingCartContext,
//   ShoppingCartProvider,
// } from '../../contexts'

// import { Home } from '../Home';
// import { MyAccount } from "../MyAccount";
// import { MyOrders } from "../MyOrders";
// import { MyOrder } from "../MyOrder";
// import { LogIn } from "../LogIn";
// import { ProductNotFound } from "../ProductNotFound";
// import { NavBar } from "../components/NavBar";
// import { CheckoutPopUp } from '../components/CheckoutPopUp';

// const AppRoutes = () => {
//   console.log("Rendering AppRoutes");
//   const { account, logOut } = useContext(ShoppingCartContext);

//   const isUserLoggedOut = logOut;
//   const userHasAccount = Object.keys(account).length !== 0;

//   let routes = useRoutes([
//     {
//       path: "/",
//       element:
//         userHasAccount && !isUserLoggedOut ? (
//           <Home />
//         ) : (
//           <Navigate replace to={"/log-in"} />
//         ),
//     },
//     {
//       path: "/:category",
//       element:
//         userHasAccount && !isUserLoggedOut ? (
//           <Home />
//         ) : (
//           <Navigate replace to={"/log-in"} />
//         ),
//     },
//     { path: "/my-account", element: <MyAccount /> },
//     { path: "/my-order", element: <MyOrder /> },
//     { path: "/my-orders", element: <MyOrders /> },
//     { path: "/my-orders/last", element: <MyOrder /> },
//     { path: "/my-orders/:id", element: <MyOrder /> },
//     { path: "/log-in", element: <LogIn /> },
//     { path: "/", element: <ProductNotFound /> },
//   ])

//   return routes;
// }

// function App() {
//   return(
//     <ShoppingCartProvider>
//       <BrowserRouter>
//         <AppRoutes />
//         <NavBar />
//         <CheckoutPopUp />
//       </BrowserRouter>
//     </ShoppingCartProvider>
//   )
// }

// export default App;