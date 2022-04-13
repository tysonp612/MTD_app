import { ProductsActionTypes } from "./products.types";
const INITIAL_STATE = {
  currentProducts: [],
};
// const addProdToCart = (oldProd, newProd) => {
//   return [...oldProd, newProd];
// };
export const productsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductsActionTypes.STORE_PRODUCTS_TO_CART:
      return {
        ...state,
        currentProducts: [...state.currentProducts, action.payload],
      };

    default:
      return state;
  }
};
