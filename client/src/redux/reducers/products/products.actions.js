import { ProductsActionTypes } from "./products.types";

export const addProducts = (product) => {
  return { type: ProductsActionTypes.ADD_PRODUCTS, payload: products };
};
