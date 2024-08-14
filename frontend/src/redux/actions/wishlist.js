// add to wishlist
import * as actionTypes from "./ActionTypeWishlist";

export const addToWishlist = (data) => async (dispatch, getState) => {
  console.log("WISHLIST", data);
  dispatch({
    type: actionTypes.ADD_TO_WISHLIST,
    payload: data,
  });

  localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlists.wishlist));
  return data;
};

// remove from wishlist
export const removeFromWishlist = (data) => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.REMOVE_FROM_WISHLIST,
    payload: data._id,
  });
  localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlists.wishlist));
  return data;
};

export const clearWishlist = () => ({
  type: actionTypes.CLEAR_WISHLIST,
});
