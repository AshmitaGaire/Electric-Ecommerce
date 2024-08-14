// add to cart
import * as actionTypes from "./ActionTypeCart";

export const addTocart = (data) => async (dispatch, getState) => {
  console.log("cart", data);
  dispatch({
    type: actionTypes.ADD_TO_CART,
    payload: data,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
  return data;
};

// remove from cart
export const removeFromCart = (data) => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.REMOVE_FROM_CART,
    payload: data._id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
  return data;
};

export const clearCart = () => ({
  type: actionTypes.CLEAR_CART,
});
