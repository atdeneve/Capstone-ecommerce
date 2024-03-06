import React from 'react';
import { render, jest, test, describe, expect } from '@testing-library/react';
import PropTypes from 'prop-types';
import { Layout } from './Layout';

jest.mock('prop-types', () => ({
  ...jest.requireActual('prop-types'),
  node: PropTypes.node,
}));

describe('Layout Component', () => {
  test('renders the component', () => {
    const { container } = render(<Layout>Hello, World!</Layout>);
    expect(container.querySelector('.outline')).toBeInTheDocument();
  });

  test('renders children prop', () => {
    const { getByText } = render(<Layout>Test Content</Layout>);
    expect(getByText('Test Content')).toBeInTheDocument();
  });

  test('renders children prop correctly with multiple elements', () => {
    const { getByText } = render(
      <Layout>
        <div>Child 1</div>
        <div>Child 2</div>
      </Layout>
    );

    expect(getByText('Child 1')).toBeInTheDocument();
    expect(getByText('Child 2')).toBeInTheDocument();
  });

  test('handles PropTypes correctly', () => {
    console.error = jest.fn(); 
    expect(() => render(<Layout />)).toThrow();
  });
});
