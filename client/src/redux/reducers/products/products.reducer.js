import { ProductsActionTypes } from "./products.types";

const INITIAL_STATE = {
  products: [],
};

export const productsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductsActionTypes.ADD_PRODUCTS:
      return { ...state, products: [...state.products, action.payload] };
    default:
      return state;
  }
};
