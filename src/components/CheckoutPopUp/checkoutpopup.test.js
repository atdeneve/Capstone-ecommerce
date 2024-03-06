import React from 'react';
import { render, screen, fireEvent, jest, describe, test, expect } from '@testing-library/react';
import { CheckoutPopUp } from './CheckoutPopUp';
import { ShoppingCartContext } from '../../contexts';

// Mock the context values
jest.mock('../../contexts', () => ({
  ...jest.requireActual('../../contexts'),
  ShoppingCartContext: {
    Consumer: ({ children }) =>
      children({
        isCheckoutPopUpOpen: true,
        setIsCheckoutPopUpOpen: jest.fn(),
        cartProducts: [
          {
            id: 1,
            title: 'Product 1',
            image: 'product1.jpg',
            price: 10.99,
          },
          {
            id: 2,
            title: 'Product 2',
            image: 'product2.jpg',
            price: 20.99,
          },
        ],
        setCartProducts: jest.fn(),
        order: [],
        setOrder: jest.fn(),
        setSearchByName: jest.fn(),
      }),
  },
}));

describe('CheckoutPopUp Component', () => {
  test('renders the component', () => {
    render(<CheckoutPopUp />);
    expect(screen.getByText('My Order')).toBeInTheDocument();
  });

  test('displays product cards', () => {
    render(<CheckoutPopUp />);
    expect(screen.getAllByTestId('order-card')).toHaveLength(2);
  });

  test('calls handleDelete when delete icon is clicked', () => {
    const setCartProductsMock = jest.fn();
    jest
      .spyOn(React, 'useContext')
      .mockImplementation(() => ({
        isCheckoutPopUpOpen: true,
        setIsCheckoutPopUpOpen: jest.fn(),
        cartProducts: [
          {
            id: 1,
            title: 'Product 1',
            image: 'product1.jpg',
            price: 10.99,
          },
        ],
        setCartProducts: setCartProductsMock,
        order: [],
        setOrder: jest.fn(),
        setSearchByName: jest.fn(),
      }));

    render(<CheckoutPopUp />);
    fireEvent.click(screen.getByTestId('delete-icon'));

    expect(setCartProductsMock).toHaveBeenCalledWith([]);
  });

  test('calls handleCheckout when Checkout button is clicked', () => {
    const handleCheckoutMock = jest.fn();
    jest
      .spyOn(React, 'useContext')
      .mockImplementation(() => ({
        isCheckoutPopUpOpen: true,
        setIsCheckoutPopUpOpen: jest.fn(),
        cartProducts: [
          {
            id: 1,
            title: 'Product 1',
            image: 'product1.jpg',
            price: 10.99,
          },
        ],
        setCartProducts: jest.fn(),
        order: [],
        setOrder: jest.fn(),
        setSearchByName: jest.fn(),
      }));

    render(<CheckoutPopUp />);
    fireEvent.click(screen.getByText('Checkout'));

    expect(handleCheckoutMock).toHaveBeenCalled();
  });
});
