import { createContext, useState, useEffect } from 'react';
import { useLocalData } from '../utilities/uselocaldata';
import PropTypes from 'prop-types';
import Select from 'react-select';

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

  // const[ isCheckoutPopUpOpen, setIsCheckoutPopUpOpen ] = useState(false); //open close checkout pop up

  const [ productToShow, setProductToShow ] = useState({}); //show product

  const [ cartProducts, setCartProducts ] = useState([]); //add products to cat

  const [ order, setOrder ] = useState([]); //shopping cart show order

  const [ items, setItems ] = useState([]); //get products
  const [ filteredItems, setFilteredItems ] = useState([]);

  const [ searchByName, setSearchByName ] = useState(""); //get product by title

  const [ maxRating, setMaxRating ] = useState('');
  const [ maxPrice, setMaxPrice ] = useState('');

  const [ countries, setCountries ] = useState([]);
  const [ selectedCountry, setSelectedCountry ] = useState({});

  const [ quantity, setQuantity ] = useState(1);
  const [ cartProductQuantity, setCartProductQuantity ] = useState([]);

  const [ totalPrice, setTotalPrice ] = useState(0);

  // const [ isInitiallyFetched, setIsInitiallyFetched ] = useState(false);
  // const addItems = useContext(AddCartContext);

  const [ formData, setFormData ] = useState({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });

  ShoppingCartProvider.propTypes = {
    children: PropTypes.node.isRequired,
  }; //used to indicate that 'children' can be any renderable node
  //required ensures that prop is provided

  const clearCart = () => {
    setCartProducts([]);
    setQuantity(0);    
  }

  const updateQuantity = (productId, value) => {
    setCartProductQuantity(prevCartProductQuantity => {
      const updatedProductQuantity = prevCartProductQuantity.map(product =>
        product.id === productId ? { ...product, quantity: product.quantity + value } : product
      );
  
      const existingProduct = updatedProductQuantity.find(product => product.id === productId);
      if (!existingProduct) {
        // If the product with given id doesn't exist, create a new one
        const newProduct = { id: productId, quantity: value > 0 ? value : 0 }; // Ensure quantity is not negative
        return [...updatedProductQuantity, newProduct];
      }
  
      return updatedProductQuantity;
    });
  };

  
  // const addToCart = (productToAdd) => {
  //   const existingProductIndex = cartProducts.findIndex(product => product.id === productToAdd.id);

  //   if(existingProductIndex !== -1) {
  //     const updatedCartProducts = [...cartProducts];
  //     updatedCartProducts[existingProductIndex].quantity += productToAdd.quantity;
  //     setCartProducts(updatedCartProducts);
  //   } else {
  //     setCartProducts(prevCartProducts => [...prevCartProducts, productToAdd]);
  //   }
  // }

  // useEffect(() => {
  //   const newTotalPrice = cartProductQuantity.reduce((acc, product) => {
  //     // Access product quantity directly from the product object
  //     const productQuantity = parseFloat(product.quantity);
  //     const productPrice = parseFloat(product.price);
      
  //     // Check if either price or quantity is NaN, if so, return accumulator as it is
  //     if (isNaN(productPrice) || isNaN(productQuantity)) {
  //       return acc;
  //     }

  //     // Calculate total price for the product and add to accumulator
  //     return acc + (productPrice * productQuantity);
  //   }, 0);

  //   // Set the total price only if it's a valid number
  //   if (!isNaN(newTotalPrice)) {
  //     setTotalPrice(newTotalPrice);
  //   }
  // }, [cartProductQuantity]);

  const calculateTotalPrice = (products) => {
    if(!products || products.length === 0) {
      return 0;
    }
    
    return products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  };

  useEffect(() => {
    console.log("Loading cart from localStorage")
    const storedCart = window.localStorage.getItem('cart');
    if(storedCart) {
      console.log("Found cart in localStorage:", storedCart)
      setCartProducts(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    console.log("Saving cart to localStorage", cartProducts)
    window.localStorage.setItem('cart', JSON.stringify(cartProducts));
  }, [cartProducts])
  
  useEffect(() => {
    console.log('Cart product quantity updated:', cartProductQuantity);
  }, [cartProductQuantity]);
  

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      setItems(data);
      setFilteredItems(data); //initialize filteredItems with all items
      console.log(data);
    })
    .catch((error) => console.error("Error fetching data:", error));
  }, [])

  const CountrySelect = () => {
    useEffect(() => {
      fetch("https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code")
        .then((response) => response.json())
        .then((data) => {
          setCountries(data.countries);
          setSelectedCountry(data.userSelectValue);
        });
    }, []);
    return (
      <Select 
        option={countries}
        value={selectedCountry}
        onChange={(selectedOption) => setSelectedCountry(selectedOption)}
      />
    )
  }

  const fetchSingleProduct = async (productId) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
      const data = await response.json();
      setProductToShow(data.id);
    } catch (error) {
      console.error("Error fetching single product:", error);
    }
  };

  const filteredItemsByName = (items, searchByName) => {
    return items?.filter((item) => 
    item.title.toLowerCase().includes(searchByName.toLowerCase()))
  }

  const filteredItemsByRating = (items, maxRating) => {
    return items?.filter((item) => 
    item.rating.rate <= parseFloat(maxRating));
  }

  const filteredItemsByPrice = (items, maxPrice) => {
    return items?.filter((item) =>
    item.price <= parseFloat(maxPrice));
  }

  useEffect( () => {
    let tempFilteredItems = items;
    if(searchByName.length > 0) {
      tempFilteredItems = filteredItemsByName(tempFilteredItems, searchByName);
      //setFilteredItems(filteredItemsByName(items, searchByName)
    } 
    if(maxRating.length > 0) {
      tempFilteredItems = filteredItemsByRating(tempFilteredItems, maxRating);
    }
    if(maxPrice.length > 0) {
      tempFilteredItems =  filteredItemsByPrice(tempFilteredItems, maxPrice);
    }

    setFilteredItems(tempFilteredItems);
  }, [items, searchByName, maxRating, maxPrice]);


  return (
    <ShoppingCartContext.Provider 
      value={{
        isProductInfoOpen,
        setIsProductInfoOpen,
        productToShow,
        setProductToShow,
        cartProducts,
        setCartProducts,
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
        fetchSingleProduct,
        formData,
        setFormData,
        CountrySelect,
        maxRating,
        setMaxRating,
        maxPrice,
        setMaxPrice,
        quantity,
        setQuantity,
        cartProductQuantity, 
        setCartProductQuantity,
        updateQuantity,
        totalPrice,
        clearCart,
        calculateTotalPrice,
        setTotalPrice,
        // addToCart,
      }}
    >
      { children }

    </ShoppingCartContext.Provider>
  )

}