import { CartActionTypes } from "./cart.types";
import { addUniqueItemsToCart } from "./cart.utils";
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

    default:
      return state;
  }
};
