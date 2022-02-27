import { createStore, applyMiddleware } from "redux";
import rootReducer from "./../root-reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
const middlewares = [logger];
const store = createStore(rootReducer, applyMiddleware(...middlewares));
export default store;
