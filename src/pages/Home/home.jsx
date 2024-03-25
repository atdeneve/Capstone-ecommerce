import { useContext } from "react";
import { Card } from "../../components/Card/Index";
import { ProductInfo } from "../../components/ProductInfo";
import { ShoppingCartContext } from "../../contexts";
import { Filter } from "../../components/Filter";

function Home() {
  const { setSearchByName,
          filteredItems,
          maxRating,
          setMaxRating,
          maxPrice,
          setMaxPrice,
        } = useContext(ShoppingCartContext);

  const currentPath = window.location.pathname;
  let index = currentPath.substring(currentPath.lastIndexOf('/') + 1);

  const renderView = () => {
    if (!filteredItems || filteredItems.length === 0) {
      return <p>No products found.</p>;
    }

    if (index) {
      if (index === "men") {
        index = "men's clothing";
      } else if (index === "women") {
        index = "women's clothing";
      }
      return (
        <>
          {filteredItems
            .filter(item => item.category === index)
            .map((item) => (
              <Card key={item.id} productData={item} />
            ))}
        </>
      );
    } else {
      return (
        <>
          {filteredItems.map((item) => (
            <Card key={item.id} productData={item} />
          ))}
        </>
      );
    }
  };

  return (
    <div className="big-container">
      <div className="header-container">
        <h1 className="header-title">Generic Fast Fashion Brand</h1>
      </div>
      <div className="search-input-container">
      <label htmlFor="search-input">Search Products:
      <input
        type="text"
        placeholder="Search by Name"
        className="search-input"
        onChange={(event) => setSearchByName(event.target.value)}
      />
      <input
        type="text"
        placeholder="Filter products by max rating"
        className="search-input"
        onChange={(event) => setMaxRating(event.target.value)}
      />
      <input 
        type="text"
        placeholder="Filter products by price"
        className="search-input"
        onChange={(event) => setMaxPrice(event.target.value)}
      />
      </label>
      <br />
      <label className="filter-label">Filter Products: 
      <Filter />
      </label>
    </div>
      <div className="grid-container">
        {renderView()}
      </div>
      <ProductInfo />
    </div>
  );
}

export { Home };
