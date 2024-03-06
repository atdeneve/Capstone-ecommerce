import React from 'react';
import { render, screen, describe, test, expect } from '@testing-library/react';
import { OrdersCard } from './OrdersCard';

describe('OrdersCard Component', () => {
  const mockProps = {
    totalPrice: 99.99,
    totalProducts: 3,
  };

  test('renders the component', () => {
    render(<OrdersCard {...mockProps} />);
    expect(screen.getByText('3 articles')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });

  test('validates prop types correctly', () => {
    // Children prop is required, so this should throw a prop-type error
    console.error = jest.fn(); // Suppressing the expected console.error for this test
    expect(() => render(<OrdersCard />)).toThrow();
    expect(() => render(<OrdersCard {...mockProps} />)).not.toThrow();
  });

  // Add more tests as needed based on your component's behavior
});
