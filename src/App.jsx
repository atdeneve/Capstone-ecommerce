import React, { useContext } from "react";
import { useRoutes, BrowserRouter, Navigate } from "react-router-dom";
import { ShoppingCartContext, ShoppingCartProvider } from "../src/contexts/index";
import { Home } from "./pages/Home/home"
import { MyAccount } from "./pages/MyAccount/myaccount";
// import { MyOrders } from "./pages/MyOrders/myorders"
import { MyOrder } from "./pages/MyOrder/myorder";
import { LogIn } from "./pages/LogIn/login";
import { ProductNotFound } from "./pages/ProductNotFound/productnotfound"
import { NavBar } from "./components/NavBar/index";
import { ShippingForm } from "./pages/ShippingForm/shippingform";
import { CheckoutPage } from "./components/CheckOut/index";
import { OrderConfirmation } from "./pages/OrderConfirmation/orderconfirmation";

const AppRoutes = () => {
  // const { userAccount, logOut } = useContext(ShoppingCartContext);

  // const isUserLoggedOut = logOut;
  // const userHasAccount = userAccount && Object.keys(userAccount).length !== 0;

  let routes = useRoutes([
    {
      path: "/",
      element: <Home />
      // element: userHasAccount && !isUserLoggedOut ? ( <Home /> ) : ( <Navigate replace to={"/sign-in"} /> ),
    },
    {
      path: "/:category",
      element: <Home />,
      // element: userHasAccount && !isUserLoggedOut ? ( <Home /> ) : ( <Navigate replace to={"/sign-in"} /> ),
    },
    { path: "/my-account", element: <MyAccount /> },
    { path: "/my-order", element: <MyOrder /> },

    { path: "/my-orders/:id", element: <MyOrder /> },
    { path: "/sign-in", element: <LogIn /> },
    { path: "/*", element: <ProductNotFound /> },
    { path: "/shipping-form", element: <ShippingForm />},
    { path: "/checkout", element: <CheckoutPage />},
    { path: "/order-confirmation", element: <OrderConfirmation/>}

  ]);

  return routes;
};

function App() {
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <NavBar />
        <AppRoutes />
      </BrowserRouter>
    </ShoppingCartProvider>
  );
}

export default App;
