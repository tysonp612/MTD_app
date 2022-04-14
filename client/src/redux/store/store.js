import { createStore, applyMiddleware } from "redux";
import rootReducer from "./../root-reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import { persistStore } from "redux-persist";
const middlewares = [logger];
const store = createStore(rootReducer, applyMiddleware(...middlewares));
const persistor = persistStore(store);
export { store, persistor };
