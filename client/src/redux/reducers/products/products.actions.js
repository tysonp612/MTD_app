import { ProductsActionTypes } from "./products.types";

export const storeProducts = (products) => {
  return { type: ProductsActionTypes.STORE_PRODUCTS, payload: products };
};
