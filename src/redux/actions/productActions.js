import { useDispatch } from "react-redux";
import {
  getAllCategory,
  getAllProducts,
  getSearchOrder,
} from "../../components/services/apiServices";

export const FETCH_ALL_PRODUCTS = "FETCH_ALL_PRODUCTS";
export const ADD_TO_CART = "ADD_TO_CART";
export const INCREASE_CART = "INCREASE_CART";
export const DECREASE_CART = "DECREASE_CART";
export const DELETE_CART = "DELETE_CART";
export const ORDER_ONE = "ORDER_ONE";
export const DELETE_ALL_CART = "DELETE_ALL_CART";
export const DECREASE_QUANTITY_BUYONE = "DECREASE_QUANTITY_BUYONE";
export const COUNT_CART = "COUNT_CART";
export const GET_ALL_CATEGORY = "GET_ALL_CATEGORY";
export const SHOW_CART = "SHOW_CART";

export const getAllCategoryAction = () => {
  return async (dispatch) => {
    const res = await getAllCategory();
    dispatch(getAllCategoryRedux(res));
  };
};

export const getAllCategoryRedux = (data) => {
  return {
    type: GET_ALL_CATEGORY,
    payload: data,
  };
};

export const countCartRedux = (data) => {
  return {
    type: COUNT_CART,
    payload: data,
  };
};

export const decreaseBuyOne = (data) => {
  return {
    type: DECREASE_QUANTITY_BUYONE,
    payload: data,
  };
};

export const deleteCart = (data) => {
  return {
    type: DELETE_CART,
    payload: data,
  };
};

export const increaseCart = (data) => {
  return {
    type: INCREASE_CART,
    payload: data,
  };
};

export const decreaseCart = (data) => {
  return {
    type: DECREASE_CART,
    payload: data,
  };
};

export const fetchAllProductsRedux = () => {
  return async (dispatch, payload) => {
    const res = await getAllProducts();
    res.reverse();
    dispatch(allProductsRedux(res));
  };
};

export const addToCartRedux = (data) => {
  return {
    type: ADD_TO_CART,
    payload: data,
  };
};

export const allProductsRedux = (data) => {
  return {
    type: FETCH_ALL_PRODUCTS,
    payload: data,
  };
};

export const orderOne = (data) => {
  return {
    type: ORDER_ONE,
    payload: data,
  };
};
export const deleteAllCart = () => {
  return {
    type: DELETE_ALL_CART,
  };
};
