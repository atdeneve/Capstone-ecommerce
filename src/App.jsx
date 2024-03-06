import React, { useContext } from "react";
import { useRoutes, BrowserRouter, Navigate } from "react-router-dom";
import { ShoppingCartContext, ShoppingCartProvider } from "../src/contexts/index";
import { Home } from "./pages/Home/home"
import { MyAccount } from "./pages/MyAccount/myaccount";
import { MyOrders } from "./pages/MyOrders/myorders"
import { MyOrder } from "./pages/MyOrder/myorder";
import { LogIn } from "./pages/LogIn/login";
import { ProductNotFound } from "./pages/ProductNotFound/productnotfound"
import { NavBar } from "./components/NavBar/index";
import { CheckoutPopUp } from "../src/components/CheckoutPopUp/index"

const AppRoutes = () => {
  const { userAccount, logOut } = useContext(ShoppingCartContext);

  const isUserLoggedOut = logOut;
  const userHasAccount = userAccount && Object.keys(userAccount).length !== 0;

  let routes = useRoutes([
    {
      path: "/",
      element: userHasAccount && !isUserLoggedOut ? ( <Home /> ) : ( <Navigate replace to={"/sign-in"} /> ),
    },
    {
      path: "/:category",
      element: userHasAccount && !isUserLoggedOut ? ( <Home /> ) : ( <Navigate replace to={"/sign-in"} /> ),
    },
    { path: "/my-account", element: <MyAccount /> },
    { path: "/my-order", element: <MyOrder /> },
    { path: "/my-orders", element: <MyOrders /> },
    { path: "/my-orders/last", element: <MyOrder /> },
    { path: "/my-orders/:id", element: <MyOrder /> },
    { path: "/sign-in", element: <LogIn /> },
    { path: "/*", element: <ProductNotFound /> },
  ]);

  return routes;
};

function App() {
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <AppRoutes />
        <NavBar />
        <CheckoutPopUp />
      </BrowserRouter>
    </ShoppingCartProvider>
  );
}

export default App;
