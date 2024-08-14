import { createReducer } from "@reduxjs/toolkit";
import {
  ADD_TO_WISHLIST,
  CLEAR_WISHLIST,
  REMOVE_FROM_WISHLIST,
} from "../actions/ActionTypeWishlist"; // Adjust the path as needed

const initialState = {
  wishlist: localStorage.getItem("wishlistItems")
    ? JSON.parse(localStorage.getItem("wishlistItems"))
    : [],
};
console.log("wishlistItems", localStorage.getItem("wishlistItems"));

export const wishlistReducer = createReducer(initialState, (builder) => {
  console.log("wishlist reducer");
  builder
    .addCase(ADD_TO_WISHLIST, (state, action) => {
      const item = action.payload;
      console.log("wishlist from reducer", action.payload);

      const isItemExist = state.wishlist.find((i) => i._id === item._id);
      let newWishlist;
      if (isItemExist) {
        newWishlist = state.wishlist.map((i) =>
          i._id === isItemExist._id ? item : i
        );
      } else {
        newWishlist = [...state.wishlist, item];
      }
      localStorage.setItem("wishlistItems", JSON.stringify(newWishlist));

      // Return a new state object
      return {
        ...state,
        wishlist: newWishlist,
      };
    })
    .addCase(REMOVE_FROM_WISHLIST, (state, action) => {
      const newWishlist = state.wishlist.filter(
        (i) => i._id !== action.payload
      );
      localStorage.setItem("wishlistItems", JSON.stringify(newWishlist));
      // Return a new state object with the updated wishlist array
      return {
        ...state,
        wishlist: newWishlist,
      };
    })
    .addCase(CLEAR_WISHLIST, (state) => {
      localStorage.removeItem("wishlistItems"); // Remove wishlist from local storage
      // Return a new state object with an empty wishlist array
      return {
        ...state,
        wishlist: [],
      };
    });
});
