import React from 'react';
import { render, screen, fireEvent, jest, describe, test, expect } from '@testing-library/react';
import { ProductInfo } from './ProductInfo';
import { ShoppingCartContext } from '../../contexts';

// Mock the context values
jest.mock('../../contexts', () => ({
  ...jest.requireActual('../../contexts'),
  ShoppingCartContext: {
    Consumer: ({ children }) =>
      children({
        productToShow: {
          image: 'test.jpg',
          title: 'Test Product',
          price: 19.99,
          description: 'Test description',
        },
        isProductInfoOpen: true,
        setIsProductInfoOpen: jest.fn(),
      }),
  },
}));

describe('ProductInfo Component', () => {
  test('renders the component', () => {
    render(<ProductInfo />);
    expect(screen.getByText('Detail')).toBeInTheDocument();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('$19.99')).toBeInTheDocument();
  });

  test('closes the component when close icon is clicked', () => {
    const setIsProductInfoOpenMock = jest.fn();
    jest
      .spyOn(React, 'useContext')
      .mockImplementation(() => ({
        productToShow: {
          image: 'test.jpg',
          title: 'Test Product',
          price: 19.99,
          description: 'Test description',
        },
        isProductInfoOpen: true,
        setIsProductInfoOpen: setIsProductInfoOpenMock,
      }));

    render(<ProductInfo />);
    fireEvent.click(screen.getByTestId('product-info-close-icon'));

    expect(setIsProductInfoOpenMock).toHaveBeenCalledWith(false);
  });

  // Add more tests as needed based on your component's behavior
});
