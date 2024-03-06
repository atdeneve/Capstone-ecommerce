import React from 'react';
import { render, act, jest, describe, test, expect } from '@testing-library/react';
import { ShoppingCartProvider, ShoppingCartContext } from './ShoppingCartContext';
import { useLocalData } from '../utilities/uselocaldata';

// Mock the useLocalData hook
jest.mock('../utilities/uselocaldata', () => ({
  useLocalData: jest.fn(() => ({
    item: {},
    saveItem: jest.fn(),
  })),
}));

describe('ShoppingCartProvider Component', () => {
  test('renders the provider with initial values', () => {
    render(
      <ShoppingCartProvider>
        <ShoppingCartContext.Consumer>
          {(contextValues) => {
            expect(contextValues.isProductInfoOpen).toBe(false);
            expect(contextValues.isCheckoutPopUpOpen).toBe(false);
            expect(contextValues.productToShow).toEqual({});
            expect(contextValues.cartProducts).toEqual([]);
            expect(contextValues.order).toEqual([]);
            expect(contextValues.items).toEqual([]);
            expect(contextValues.searchByName).toBe("");
            expect(contextValues.filteredItems).toEqual([]);
            expect(contextValues.userAccount).toEqual({});
            expect(contextValues.logOut).toBe(false);

            // Ensure the useEffect is triggered and data is fetched
            act(() => {
              jest.advanceTimersByTime(1000); // Advance timers to simulate useEffect delay
            });

            expect(contextValues.items).not.toEqual([]);
          }}
        </ShoppingCartContext.Consumer>
      </ShoppingCartProvider>
    );
  });

});
