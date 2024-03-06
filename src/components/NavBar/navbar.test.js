import React from 'react';
import { render, screen, fireEvent, jest, describe, test, expect } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { NavBar } from './NavBar';
import { ShoppingCartContext } from '../../contexts';

// Mock the context values
jest.mock('../../contexts', () => ({
  ...jest.requireActual('../../contexts'),
  ShoppingCartContext: {
    Consumer: ({ children }) =>
      children({
        logOut: false,
        userAccount: { email: 'test@example.com' },
        saveLogOut: jest.fn(),
        setCartProducts: jest.fn(),
        setIsCheckoutPopUpOpen: jest.fn(),
        setSearchByName: jest.fn(),
        setIsProductInfoOpen: jest.fn(),
      }),
  },
}));

describe('NavBar Component', () => {
  test('renders the component', () => {
    render(
      <Router>
        <NavBar />
      </Router>
    );
    expect(screen.getByText('Shop')).toBeInTheDocument();
  });

  test('displays user email when logged in', () => {
    render(
      <Router>
        <NavBar />
      </Router>
    );
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  test('displays My Orders, My Account, and Sign Out links when logged in', () => {
    render(
      <Router>
        <NavBar />
      </Router>
    );
    expect(screen.getByText('My Orders')).toBeInTheDocument();
    expect(screen.getByText('My Account')).toBeInTheDocument();
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });

  test('calls handleLogOut when Sign Out link is clicked', () => {
    const setCartProductsMock = jest.fn();
    const saveLogOutMock = jest.fn();
    jest
      .spyOn(React, 'useContext')
      .mockImplementation(() => ({
        logOut: false,
        userAccount: { email: 'test@example.com' },
        saveLogOut: saveLogOutMock,
        setCartProducts: setCartProductsMock,
        setIsCheckoutPopUpOpen: jest.fn(),
        setSearchByName: jest.fn(),
        setIsProductInfoOpen: jest.fn(),
      }));

    render(
      <Router>
        <NavBar />
      </Router>
    );
    fireEvent.click(screen.getByText('Sign Out'));

    expect(setCartProductsMock).toHaveBeenCalledWith([]);
    expect(saveLogOutMock).toHaveBeenCalledWith(true);
  });

  // Add more tests as needed based on your component's behavior
});
