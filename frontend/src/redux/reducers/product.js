import * as actionTypes from "../actions/ActionTypes";

const initialState = {
  isLoading: false,
  products: [],
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PRODUCT_CREATE_REQUEST:
    case actionTypes.GET_ALL_PRODUCTS_SHOP_REQUEST:
    case actionTypes.DELETE_PRODUCT_REQUEST:
    case actionTypes.GET_ALL_PRODUCTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case actionTypes.PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: [...state.products, action.payload],
        error: null, // Make sure to reset error to null on success
      };
    case actionTypes.GET_ALL_PRODUCTS_SHOP_SUCCESS:
    case actionTypes.GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: [...action.payload],
        error: null,
      };
    case actionTypes.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: state.products.filter(
          product => product.id !== action.payload
        ),
        error: null, // Make sure to reset error to null on success
      };
    case actionTypes.PRODUCT_CREATE_FAIL:
    case actionTypes.GET_ALL_PRODUCTS_SHOP_FAILED:
    case actionTypes.DELETE_PRODUCT_FAILED:
    case actionTypes.GET_ALL_PRODUCTS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};


export default productReducer;
