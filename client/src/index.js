//React
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

//Redux
import { store } from "./redux/store/store";
import { Provider } from "react-redux";

//App
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
