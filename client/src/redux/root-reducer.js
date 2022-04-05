import { combineReducers } from "redux";
import { userReducer } from "./reducers/user/user.reducer";
import { productsReducer } from "./reducers/products/products.reducer";
import { queryReducer } from "./reducers/search-query/search-query.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  query: queryReducer,
  products: productsReducer,
});
export default rootReducer;
