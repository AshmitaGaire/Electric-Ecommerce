import { createReducer } from "@reduxjs/toolkit";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
} from "../actions/ActionTypeCart"; // Adjust the path as needed

const initialState = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};
console.log("cartItems", localStorage.getItem("cartItems"));

export const cartReducer = createReducer(initialState, (builder) => {
  console.log("cart reducer");
  builder
    .addCase(ADD_TO_CART, (state, action) => {
      const item = action.payload;
      console.log("cart from reducer", action.payload);

      const isItemExist = state.cart.find((i) => i._id === item._id);
      let newCart;
      if (isItemExist) {
        newCart = state.cart.map((i) => (i._id === isItemExist._id ? item : i));
      } else {
        newCart = [...state.cart, item];
      }
      localStorage.setItem("cartItems", JSON.stringify(newCart));

      // Return a new state object
      return {
        ...state,
        cart: newCart,
      };
    })
    .addCase(REMOVE_FROM_CART, (state, action) => {
      // Create a new cart array without the item to be removed
      const newCart = state.cart.filter((i) => i._id !== action.payload);
      // Update local storage
      localStorage.setItem("cartItems", JSON.stringify(newCart));
      // Return a new state object with the updated cart array
      return {
        ...state,
        cart: newCart,
      };
    })
    .addCase(CLEAR_CART, (state) => {
      localStorage.removeItem("cartItems");
      // Return a new state object with an empty cart array
      return {
        ...state,
        cart: [],
      };
      // Remove cart items from local storage
    });
});
