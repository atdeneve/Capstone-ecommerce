import React from 'react';
import { render, screen, fireEvent, jest, describe, test, expect } from '@testing-library/react';
import { OrderCard } from './OrderCard';

describe('OrderCard Component', () => {
  const mockProps = {
    id: 1,
    title: 'Test Product',
    imageUrl: 'test.jpg',
    price: 19.99,
    handleDelete: jest.fn(),
  };

  test('renders the component', () => {
    render(<OrderCard {...mockProps} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  test('validates prop types correctly', () => {
    console.error = jest.fn(); 
    expect(() => render(<OrderCard />)).toThrow();
    expect(() => render(<OrderCard {...mockProps} />)).not.toThrow();
  });

  test('calls handleDelete when delete icon is clicked', () => {
    render(<OrderCard {...mockProps} />);
    fireEvent.click(screen.getByTestId('order-card-delete-icon'));

    expect(mockProps.handleDelete).toHaveBeenCalledWith(1);
  });

});
