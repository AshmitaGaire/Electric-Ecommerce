import axios from "axios";
import { server } from "../../server";
import * as actionTypes from "../actions/ActionTypeOrder"; // Import action type constants

// get all orders of user
export const getAllOrdersOfUser = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.GET_ALL_ORDERS_USER_REQUEST, // Use action type constant
    });

    const { data } = await axios.get(
      `${server}/order/get-all-orders/${userId}`
    );

    dispatch({
      type: actionTypes.GET_ALL_ORDERS_USER_SUCCESS, // Use action type constant
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ALL_ORDERS_USER_FAILED, // Use action type constant
      payload: error.response.data.message,
    });
  }
};

// get all orders of seller
export const getAllOrdersOfShop = (shopId) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.GET_ALL_ORDERS_SHOP_REQUEST, // Use action type constant
    });

    const { data } = await axios.get(
      `${server}/order/get-seller-all-orders/${shopId}`
    );

    dispatch({
      type: actionTypes.GET_ALL_ORDERS_SHOP_SUCCESS, // Use action type constant
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ALL_ORDERS_SHOP_FAILED, // Use action type constant
      payload: error.response.data.message,
    });
  }
};
