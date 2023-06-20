import { useEffect } from "react";
import {
  ADD_TO_CART,
  FETCH_ALL_PRODUCTS,
  DECREASE_CART,
  INCREASE_CART,
  DELETE_CART,
  ORDER_ONE,
  BUY_ONE,
  DELETE_CART_BUY_ONE,
  DECREASE_QUANTITY_BUYONE,
  COUNT_CART,
  GET_ALL_CATEGORY,
  DELETE_ALL_CART,
  SHOW_CART,
} from "../actions/productActions";

const INITIAL_STATE = {
  product: [],
  cartProduct: [],
  countCart: 0,
  allCategory: [],
  showCart: false,
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_PRODUCTS:
      return {
        ...state,
        product: action.payload,
      };

    case INCREASE_CART:
      let newCart = state.cartProduct;

      const indexProduct = newCart.findIndex(
        (item) => +item.id === action.payload.id
      );

      newCart[indexProduct].quantity = newCart[indexProduct].quantity + 1;

      return {
        ...state,
        cartProduct: [...newCart],
      };

    case DECREASE_CART:
      let newCart2 = state.cartProduct;
      const indexProduct2 = newCart2.findIndex(
        (item) => +item.id === action.payload.id
      );
      if (newCart2[indexProduct2].quantity === 1) {
        newCart2[indexProduct2].quantity = 1;
      } else {
        newCart2[indexProduct2].quantity = newCart2[indexProduct2].quantity - 1;
      }

      return {
        ...state,
        cartProduct: [...newCart2],
      };

    case DECREASE_QUANTITY_BUYONE:
      let newCartBuyOne = state.cartProduct;
      const indexProductBuyOne = newCartBuyOne.findIndex(
        (item) => +item.id === action.payload.id
      );

      newCartBuyOne[indexProductBuyOne].quantity = 1;

      return {
        ...state,
        cartProduct: [...newCartBuyOne],
      };

    case DELETE_CART:
      let cloneDelete = state.cartProduct;

      const arrDelete = cloneDelete.filter(
        (item) => +item.id !== action.payload.id
      );

      return {
        ...state,
        cartProduct: [...arrDelete],
      };

    case ADD_TO_CART:
      const productInCart = state.cartProduct.find(
        (p) => +p.id === action.payload.id
      );
      if (!productInCart) {
        const newProduct = action.payload;
        newProduct.quantity = 1;
        return {
          ...state,
          cartProduct: [...state.cartProduct, newProduct],
        };
      } else {
        let newCart = state.cartProduct;
        const indexProduct = newCart.findIndex(
          (item) => +item.id === action.payload.id
        );
        if (newCart[indexProduct].quantity == undefined) {
          newCart[indexProduct].quantity = 1;
        } else {
          newCart[indexProduct].quantity = newCart[indexProduct].quantity + 1;
        }
        return {
          ...state,
          cartProduct: [...newCart],
        };
      }

    case ORDER_ONE:
      let cartOrdered = [];
      state.cartProduct.map((item) => {
        action.payload.map((order, index) => {
          if (
            item.id * item.quantity * item.price !==
            order.cartId * order.quantity * order.price
          ) {
            cartOrdered.push(item);
          }
        });
      });

      return {
        ...state,
        cartProduct: cartOrdered,
      };

    case DELETE_ALL_CART:
      return {
        ...state,
        cartProduct: [],
      };

    case COUNT_CART:
      return {
        ...state,
        countCart: action.payload,
      };

    case GET_ALL_CATEGORY:
      return {
        ...state,
        allCategory: action.payload,
      };

    case SHOW_CART:
      return {
        ...state,
        showCart: action.payload,
      };

    default:
      return state;
  }
};

export default productReducer;
