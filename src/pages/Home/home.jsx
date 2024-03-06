import { useContext } from "react";

import { Card } from "../../components/Card/Index";
import { ProductInfo } from "../../components/ProductInfo";
import { ShoppingCartContext } from "../../contexts";

function Home() {
  const { setSearchByName, filteredItems } = useContext(ShoppingCartContext);

  const currentPath = window.location.pathname
  let index = currentPath.substring(currentPath.lastIndexOf('/') + 1);

  const renderView = () => {
    if(index) {
      if (index === "men") {
        index = "men's clothing";
      } else if (index === "women") {
        index = "women's clothing";
      }
      return(
        <>
          {filteredItems?.filter(item => 
            item.category === index).map((item) => 
            (<Card key={item.id} {...item}/>))}
        </>
      );
  } else {
    return(
      filteredItems?.map((item) => <Card key={item.id} {...item} />)
    );
  }
}

return (
  <>
    <div className="header-container">
      <h1 className="header-title">Exclusive products</h1>
    </div>
    <input
      type="text"
      placeholder="Search a product"
      className="search-input"
      onChange={(event) => setSearchByName(event.target.value)}
    />
      <div className="grid-container">
        {renderView()}
      </div>
      <ProductInfo />
  </>
)
}

export { Home }