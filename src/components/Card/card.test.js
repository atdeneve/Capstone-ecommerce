import React, { useContext } from "react";
import { render, screen, fireEvent, test, expect, jest } from "@testing-library/react";
import { Card } from "./Card";
import { ShoppingCartContext } from "../../contexts";

// Mock the context values
jest.mock("../../contexts", () => ({
  ...jest.requireActual("../../contexts"),
  ShoppingCartContext: {
    Consumer: ({ children }) => children({
      setIsProductInfoOpen: jest.fn(),
      setProductToShow: jest.fn(),
      cartProducts: [],
      setCartProducts: jest.fn(),
      setIsCheckoutPopUpOpen: jest.fn(),
    }),
  },
}));

const mockProductData = {
  id: 1,
  category: "Electronics",
  title: "Example Product",
  price: 99.99,
  image: "example.jpg",
};

test("renders card details correctly", () => {
  render(<Card {...mockProductData} />);
  expect(screen.getByText("Example Product")).toBeInTheDocument();
  expect(screen.getByText("$99.99")).toBeInTheDocument();
});

test("calls setIsProductInfoOpen and setProductToShow on handleProductClick", () => {
  const { setIsProductInfoOpen, setProductToShow } = useContext(ShoppingCartContext);

  render(<Card {...mockProductData} />);
  fireEvent.click(screen.getByText("Example Product"));

  expect(setIsProductInfoOpen).toHaveBeenCalledWith(true);
  expect(setProductToShow).toHaveBeenCalledWith(mockProductData);
});

test("calls setCartProducts, setIsCheckoutPopUpOpen, and setIsProductInfoOpen on handleAddToCart", () => {
  const { setCartProducts, setIsCheckoutPopUpOpen, setIsProductInfoOpen } = useContext(ShoppingCartContext);

  render(<Card {...mockProductData} />);
  fireEvent.click(screen.getByRole("button"));

  expect(setCartProducts).toHaveBeenCalledWith([mockProductData]);
  expect(setIsCheckoutPopUpOpen).toHaveBeenCalledWith(true);
  expect(setIsProductInfoOpen).toHaveBeenCalledWith(false);
});

test("renders CheckIcon if product is in cart, otherwise renders PlusIcon", () => {
  const { setCartProducts } = useContext(ShoppingCartContext);
  setCartProducts([mockProductData]);

  render(<Card {...mockProductData} />);
  
  expect(screen.getByTestId("icon-button-check")).toBeInTheDocument();
  expect(screen.queryByTestId("icon-button-plus")).not.toBeInTheDocument();
});

test("does not call handleAddToCart if product is already in cart", () => {
  const { setCartProducts } = useContext(ShoppingCartContext);
  setCartProducts([mockProductData]);

  render(<Card {...mockProductData} />);
  fireEvent.click(screen.getByRole("button"));

  expect(setCartProducts).not.toHaveBeenCalled();
});
