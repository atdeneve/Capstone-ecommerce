import React from 'react';
import { render, screen, fireEvent, jest, describe, test, expect } from '@testing-library/react';
import { Home, useContext } from './Home';
import { ShoppingCartContext } from '../../contexts';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

const mockFilteredItems = [
  { id: 1, category: "men's clothing", title: 'Test Product 1', price: 19.99 },
  { id: 2, category: "women's clothing", title: 'Test Product 2', price: 24.99 },
];

describe('Home Component', () => {
  test('renders the component with initial values', () => {
    useContext.mockReturnValueOnce({
      setSearchByName: jest.fn(),
      filteredItems: mockFilteredItems,
    });

    render(<Home />);
    
    // Ensure the component renders correctly
    expect(screen.getByText('Exclusive products')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search a product')).toBeInTheDocument();
    expect(screen.getAllByTestId('card')).toHaveLength(mockFilteredItems.length);
  });

  test('filters items based on search input', () => {
    const setSearchByNameMock = jest.fn();

    useContext.mockReturnValueOnce({
      setSearchByName: setSearchByNameMock,
      filteredItems: mockFilteredItems,
    });

    render(<Home />);

      fireEvent.change(screen.getByPlaceholderText('Search a product'), {
      target: { value: 'Test' },
    });

    expect(setSearchByNameMock).toHaveBeenCalledWith('Test');
  });

});
