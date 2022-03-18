import { combineReducers } from "redux";
import { userReducer } from "./reducers/user/user.reducer";
import { productsReducer } from "./reducers/products/products.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
});
export default rootReducer;
