import { CartActionTypes } from "./cart.types";
import {
  addUniqueItemsToCart,
  removeItemFromCart,
  deleteItemFromCart,
} from "./cart.utils";
const INITIAL_STATE = {
  cartItems: [],
};

export const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.ADD_TO_CART:
      return {
        ...state,
        cartItems: addUniqueItemsToCart(state.cartItems, action.payload),
      };
    case CartActionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload),
      };
    case CartActionTypes.DELETE_FROM_CART:
      return {
        ...state,
        cartItems: deleteItemFromCart(state.cartItems, action.payload),
      };
    default:
      return state;
  }
};
