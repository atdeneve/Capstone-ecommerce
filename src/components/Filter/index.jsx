import { useContext, useState } from 'react';
import { ShoppingCartContext } from '../../contexts';

const Filter = () => {
  const { items, setFilteredItems } = useContext(ShoppingCartContext);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [ascendingOrder, setAscendingOrder] = useState(true);

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
    filterItems(event.target.value);
  };

  const filterItems = (filterType) => {
    let filteredItems = [...items];

    switch (filterType) {
      case "category-asc":
        filteredItems.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case "category-desc":
        filteredItems.sort((a, b) => b.category.localeCompare(a.category));
        break;
      case "title-asc":
        filteredItems.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        filteredItems.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "price":
        filteredItems.sort((a, b) => {
          return ascendingOrder ? a.price - b.price : b.price - a.price;
        });
        break;
      default:
        break;
    }

    setFilteredItems(filteredItems);
  };

  const toggleOrder = () => {
    setAscendingOrder((prevOrder) => !prevOrder);
    filterItems(selectedFilter); // Reapply filtering with new order
  };

  return (
    <div>
      <select value={selectedFilter} onChange={handleFilterChange}>
        <option value="">Select Filter</option>
        <optgroup>
          <option value="category-asc">Category (A-Z)</option>
          <option value="category-desc">Category (Z-A)</option>
        </optgroup>
        <optgroup>
          <option value="title-asc">Name (A-Z)</option>
          <option value="title-desc">Name (Z-A)</option>
        </optgroup>
        <option value="price">
          Price {ascendingOrder ? '(Low to High)' : '(High to Low)'}
        </option>
      </select>
      {selectedFilter === 'price' && (
        <button onClick={toggleOrder}>Toggle Order</button>
      )}
    </div>
  );
};

export { Filter };
