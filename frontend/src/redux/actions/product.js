import * as actionTypes from "./ActionTypes";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const createProductRequest = () => ({
  type: actionTypes.PRODUCT_CREATE_REQUEST,
});

const createProductSuccess = (product) => ({
  type: actionTypes.PRODUCT_CREATE_SUCCESS,
  payload: product,
});

const createProductFail = (error) => ({
  type: actionTypes.PRODUCT_CREATE_FAIL,
  payload: error,
});

export const createProduct = (newForm) => async (dispatch) => {
  try {
    dispatch(createProductRequest());

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `${server}/product/create-product`,
      newForm,
      config
    );
    dispatch(createProductSuccess(data.product));
    toast.success("Product created successfully!");
  } catch (error) {
    dispatch(createProductFail(error.response.data.message));
    toast.error(error.response.data.message);
  }
};

// get All Products of a shop
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.GET_ALL_PRODUCTS_SHOP_REQUEST,
    });

    const { data } = await axios.get(
      `${server}/product/get-all-products-shop/${id}`
    );
    dispatch({
      type: actionTypes.GET_ALL_PRODUCTS_SHOP_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ALL_PRODUCTS_SHOP_FAILED,
      payload: error.response.data.message,
    });
  }
};

// delete product of a shop
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.DELETE_PRODUCT_REQUEST,
    });

    const { data } = await axios.delete(
      `${server}/product/delete-shop-product/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: actionTypes.DELETE_PRODUCT_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.DELETE_PRODUCT_FAILED,
      payload: error.response.data.message,
    });
  }
};

// get all products
export const getAllProducts = () => async (dispatch) => {
  console.log(2);

  try {
    dispatch({
      type: actionTypes.GET_ALL_PRODUCTS_REQUEST,
    });

    const { data } = await axios.get(`${server}/product/get-all-products`);
    console.log("data fetched success", data);
    console.log(2.1);
    dispatch({
      type: actionTypes.GET_ALL_PRODUCTS_SUCCESS,
      payload: [...data?.products],
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ALL_PRODUCTS_FAILED,
      payload: error.response.data.message,
    });
  }
};
