import { ProductsActionTypes } from "./products.types";

export const storeProducts = (products) => {
  return {
    type: ProductsActionTypes.STORE_PRODUCTS_TO_CART,
    payload: products,
  };
};
