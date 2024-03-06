import React from 'react';
import { render, screen, fireEvent, jest, test, describe, expect } from '@testing-library/react';
import { ShoppingCart } from './ShoppingCart';
import { ShoppingCartContext } from '../../contexts';

jest.mock('../../contexts', () => ({
  ...jest.requireActual('../../contexts'),
  ShoppingCartContext: {
    Consumer: ({ children }) =>
      children({
        cartProducts: [
          { id: 1, title: 'Test Product 1', price: 19.99 },
          { id: 2, title: 'Test Product 2', price: 24.99 },
        ],
        setIsCheckoutPopUpOpen: jest.fn(),
        setIsProductInfoOpen: jest.fn(),
      }),
  },
}));

describe('ShoppingCart Component', () => {
  test('renders the component', () => {
    render(<ShoppingCart />);
    expect(screen.getByTestId('shopping-cart-icon')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument(); // Assuming you want to display the number of items in the cart
  });

  test('calls openCheckoutPopUp when clicked', () => {
    const setIsProductInfoOpenMock = jest.fn();
    const setIsCheckoutPopUpOpenMock = jest.fn();
    jest
      .spyOn(React, 'useContext')
      .mockImplementation(() => ({
        cartProducts: [
          { id: 1, title: 'Test Product 1', price: 19.99 },
          { id: 2, title: 'Test Product 2', price: 24.99 },
        ],
        setIsCheckoutPopUpOpen: setIsCheckoutPopUpOpenMock,
        setIsProductInfoOpen: setIsProductInfoOpenMock,
      }));

    render(<ShoppingCart />);
    fireEvent.click(screen.getByTestId('shopping-cart-container'));

    expect(setIsProductInfoOpenMock).toHaveBeenCalledWith(false);
    expect(setIsCheckoutPopUpOpenMock).toHaveBeenCalledWith(true);
  });

});
