import { createReducer } from "@reduxjs/toolkit";
import * as actionTypes from "../actions/ActionTypeOrder";

const initialState = {
  isLoading: true,
  orders: [],
  error: null,
};

export const orderReducer = createReducer(initialState, (builder) => {
  builder
    // Get all orders of user
    .addCase(actionTypes.GET_ALL_ORDERS_USER_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(actionTypes.GET_ALL_ORDERS_USER_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    })
    .addCase(actionTypes.GET_ALL_ORDERS_USER_FAILED, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Get all orders of shop
    .addCase(actionTypes.GET_ALL_ORDERS_SHOP_REQUEST, (state) => {
      state.isLoading = true;
    })
    .addCase(actionTypes.GET_ALL_ORDERS_SHOP_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    })
    .addCase(actionTypes.GET_ALL_ORDERS_SHOP_FAILED, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    

    // .addCase(actionTypes.CLEAR_ORDER_ERRORS, (state) => {
    //   state.error = null;
    // })
    .addCase(actionTypes.CLEAR_ORDER_ERRORS, (state) => {
      return {
        ...state,
        error: null,
      };
    });
});
