import { ProductsActionTypes } from "./products.types";
const INITIAL_STATE = {
  currentProducts: null,
};
export const productsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductsActionTypes.STORE_PRODUCTS:
      return { ...state, currentProducts: action.payload };

    default:
      return state;
  }
};
