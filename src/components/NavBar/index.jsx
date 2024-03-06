import { useContext } from "react";
import { NavLink } from "react-router-dom";

import "./index.css"
import { ShoppingCartContext } from "../../contexts";
import { ShoppingCart } from "../ShoppingCart/index"

const NavBar = () => {
  const { 
    logOut, 
    userAccount, 
    saveLogOut, 
    setCartProducts, 
    setIsCheckoutPopUpOpen, 
    setSearchByName, 
    setIsProductInfoOpen } = useContext(ShoppingCartContext);

    // const activeStyle = "underline underline-offset-4";

    const isUserLoggedOut = logOut;
    const hasUserAccount = Object.keys(userAccount).length !== 0;

    console.log("isUserLoggedOut:", isUserLoggedOut);
    console.log("hasUserAccount:", hasUserAccount);
    console.log("logOut:", logOut);
  
    const handleLogOut = () => {
      setCartProducts([]);
      setIsCheckoutPopUpOpen(false);
      setIsProductInfoOpen(false);
      setSearchByName('');
      saveLogOut(true);
    }

    const renderView = () => {
      console.log("Rendering view");
      if (hasUserAccount && !isUserLoggedOut) {
        return (
          <>
            <li className="navbar-email">
              { userAccount?.email }
            </li>
            <li>
              <NavLink
                to="/my-orders"
                className="navbar-link"
              >
                My Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/my-account"
                className="navbar-link"
              >
                My Account
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/sign-in"
                className="navbar-link"
                onClick={ () => handleLogOut()}
              >
                Sign Out
              </NavLink>
            </li>
          </>
        );
      }
    }

    return (
      <nav className="nav-container">
        <ul className="nav-list">
          <li className="nav-text">
            <NavLink to={`${isUserLoggedOut ? "/sign-in" : "/"}`}>Shop</NavLink>
          </li>
          <li className="nav-visible">
            <NavLink 
              to="/"
              className="nav-link"
            >
              All
            </NavLink>
          </li>
          <li className="nav-visible">
            <NavLink 
              to="/men"
              className="nav-link"
            >
              Men
            </NavLink>
          </li>
          <li className="nav-visible">
            <NavLink 
              to="/women"
              className="nav-link"
            >
              Women
            </NavLink>
          </li>
          <li className="nav-visible">
            <NavLink 
              to="/electronics"
              className="nav-link"
            >
              Electronics
            </NavLink>
          </li>
          <li className="nav-list-jewelery">
            <NavLink 
              to="/jewelery"
              className="nav-link"
            >
              Jewelery
            </NavLink>
          </li>
        </ul>
        <ul className="nav-list">
          {renderView()}
          <li className="shopping-cart">
            <ShoppingCart />
          </li>
        </ul>
      </nav>
    )
  }

export { NavBar };
