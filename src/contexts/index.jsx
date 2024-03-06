import { createContext, useState, useEffect } from 'react';
import { useLocalData } from '../utilities/uselocaldata';
import PropTypes from 'prop-types';

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  const {  //account info
    item: userAccount,
    saveItem: saveAccount,
  } = useLocalData('account', {});

  const {
    item: logOut,
    saveItem: saveLogOut,
  } = useLocalData('log-out', false);

  const [ isProductInfoOpen, setIsProductInfoOpen ] = useState(false); //open close product pop up

  const[ isCheckoutPopUpOpen, setIsCheckoutPopUpOpen ] = useState(false); //open close checkout pop up

  const [ productToShow, setProductToShow ] = useState({}); //show product

  const [ cartProducts, setCartProducts ] = useState([]); //add products to cat

  const [ order, setOrder ] = useState([]); //shopping cart show order

  const [ items, setItems ] = useState([]); //get products
  const [ filteredItems, setFilteredItems ] = useState([]);

  const [ searchByName, setSearchByName ] = useState(""); //get product by title

  ShoppingCartProvider.propTypes = {
    children: PropTypes.node.isRequired,
  }; //used to indicate that 'children' can be any renderable node
  //required ensures that prop is provided

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      setItems(data);
      console.log(data);
    })
    .catch((error) => console.error("Error fetching data:", error));
  }, [])

  const filteredItemsByName = (items, searchByName) => {
    return items?.filter((item) => 
    item.title.toLowerCase().includes(searchByName.toLowerCase()))
  }

  useEffect( () => {
    if(searchByName.length > 0) {
      setFilteredItems(filteredItemsByName(items, searchByName))
    } else {
      setFilteredItems(items)
    }
  }, [items, searchByName])


  return (
    <ShoppingCartContext.Provider 
      value={{
        isProductInfoOpen,
        setIsProductInfoOpen,
        productToShow,
        setProductToShow,
        cartProducts,
        setCartProducts,
        isCheckoutPopUpOpen,
        setIsCheckoutPopUpOpen,
        order,
        setOrder,
        items,
        setItems,
        searchByName,
        setSearchByName,
        filteredItems,
        setFilteredItems,
        userAccount,
        saveAccount,
        logOut,
        saveLogOut,
      }}
    >
      { children }

    </ShoppingCartContext.Provider>
  )

}