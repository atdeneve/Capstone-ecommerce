import { useEffect, useState } from 'react';

function useLocalData(itemName, initialValue) {
  const [item, setItem] = useState(initialValue);
  //   () => {
  //   const localData = localStorage.getItem(itemName);
  //   return localData ? JSON.parse(localData) : initialValue;
  // });

  useEffect(() => {
    // const handleLocalStorage = () => {
      const localDataItem = localStorage.getItem(itemName);

      let parsedItem;

  //     if(!localDataItem || JSON.stringify(item) !== localData) {
  //       localStorage.setItem(itemName, JSON.stringify(item));
  //     }
  //   }
    
  //   // handleLocalStorage();
  // }, [itemName, item]);

    if(!localDataItem) {
      localStorage.setItem(itemName, JSON.stringify(initialValue));
      parsedItem = initialValue;
    } else { 
      parsedItem = JSON.parse(localDataItem);
      setItem(parsedItem);
    }
  }, []);

  const saveItem = (newItem) => {
    localStorage.setItem(itemName, JSON.stringify(newItem));
    setItem(newItem);
    console.log("Saving item:", newItem);
  };

  return {
    item,
    saveItem,
  };
}

export { useLocalData };





// import { useEffect, useState } from 'react';

// function useLocalData(itemName, initialValue) {
//   const localData = localStorage.getItem(itemName);

//   const [item, setItem] = useState(() => {
//     return localData ? JSON.parse(localData) : initialValue;
//   });
//   // const localData = localStorage.getItem(itemName);

//   useEffect(() => {
//     let parsedItem;

//     if (!localData) {
//       localStorage.setItem(itemName, JSON.stringify(initialValue));
//       parsedItem = initialValue;
//     } else {
//       parsedItem = JSON.parse(localData);
//       setItem(parsedItem);
//     }
//   }, [itemName, initialValue, localData]);

//   const saveItem = (newItem) => {
//     console.log("local", newItem);
//     localStorage.setItem(itemName, JSON.stringify(newItem));
//     setItem(newItem);
//   };

//   return {
//     item,
//     saveItem,
//   };
// }

// export { useLocalData };
