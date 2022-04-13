import { CartActionTypes } from "./cart.types";

export const addToCart = (item) => {
  return {
    type: CartActionTypes.ADD_TO_CART,
    payload: item,
  };
};
