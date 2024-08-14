// sellerReducer.js
import { createReducer } from "@reduxjs/toolkit";
import * as ActionTypes from "../actions/ActionTypesSeller";

const initialState = {
  isSeller: false,
  isLoading: false,
  seller: null,
  sellers: [],
  error: null,
};

export const sellerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ActionTypes.LOAD_SELLER_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(ActionTypes.LOAD_SELLER_SUCCESS, (state, action) => {
      console.log("hello");
      state.isSeller = true;
      state.isLoading = false;
      state.seller = action.payload;
      state.error = null;
    })
    .addCase(ActionTypes.LOAD_SELLER_FAIL, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSeller = false;
    })
    .addCase(ActionTypes.GET_ALL_SELLERS_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(ActionTypes.GET_ALL_SELLERS_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.sellers = action.payload;
    })
    .addCase(ActionTypes.GET_ALL_SELLERS_FAIL, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    // Combine both reducers for 'CLEAR_ERRORS'
    .addCase(ActionTypes.CLEAR_ERRORS, (state) => {
      state.error = null;
    });
});
