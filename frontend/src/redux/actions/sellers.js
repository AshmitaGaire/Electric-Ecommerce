// sellerActions.js
import axios from "axios";
import { server } from "../../server";
import * as ActionTypes from "./ActionTypesSeller"; // Import action type constants

export const getAllSellers = () => async (dispatch) => {
  try {
    dispatch({
      type: ActionTypes.GET_ALL_SELLERS_REQUEST,
    });

    const { data } = await axios.get(`${server}/shop/admin-all-sellers`, {
      withCredentials: true,
    });
    console.log("seller data", data);
    dispatch({
      type: ActionTypes.GET_ALL_SELLERS_SUCCESS,
      payload: data.sellers,
    });
  } catch (error) {
    dispatch({
      type: ActionTypes.GET_ALL_SELLERS_FAIL,
      //   payload: error.response.data.message,
    });
  }
};
