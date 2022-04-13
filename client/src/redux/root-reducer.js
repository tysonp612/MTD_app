import { combineReducers } from "redux";
import { userReducer } from "./reducers/user/user.reducer";
import { cartReducer } from "./reducers/cart/cart.reducer";
import { queryReducer } from "./reducers/search-query/search-query.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  query: queryReducer,
  cart: cartReducer,
});
export default rootReducer;
