import React, { useContext } from 'react';
import { render, screen, fireEvent, waitFor, jest, describe, test, expect } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ShoppingCartContext } from '../../contexts';
import { LogIn } from './LogIn';

// Mock the useContext hook
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

describe('LogIn Component', () => {
  test('renders the component with initial values', () => {
    useContext.mockReturnValueOnce({
      userAccount: {},
      saveAccount: jest.fn(),
      saveLogOut: jest.fn(),
    });

    render(<LogIn />);

    expect(screen.getByText('Welcome to Fast Fashion!!')).toBeInTheDocument();
    expect(screen.getByText('Create an Account')).toBeInTheDocument();
    expect(screen.getByText('Log In')).toBeInTheDocument();
  });

  test('toggles between log in and create user info views', async () => {
    const saveAccountMock = jest.fn();
    const saveLogOutMock = jest.fn();

    useContext.mockReturnValueOnce({
      userAccount: {},
      saveAccount: saveAccountMock,
      saveLogOut: saveLogOutMock,
    });

    render(<LogIn />);

    fireEvent.click(screen.getByText('Register'));

    expect(screen.getByLabelText('Your name:')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Log In'));

    expect(screen.getByText('Create an Account')).toBeInTheDocument();
  });

  test('logs in when the user has an account', async () => {
    const saveLogOutMock = jest.fn();

    useContext.mockReturnValueOnce({
      userAccount: { name: 'Test User', email: 'test@example.com', password: 'password' },
      saveLogOut: saveLogOutMock,
    });

    render(<LogIn />);

    fireEvent.click(screen.getByText('Log In'));

    expect(saveLogOutMock).toHaveBeenCalledWith(false);

    await waitFor(() => expect(screen.queryByText('Welcome to Fast Fashion!!')).toBeNull());
  });

});
