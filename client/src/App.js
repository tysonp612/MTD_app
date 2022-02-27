//Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; //in node_modules
//React
import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
//Redux
import { useDispatch } from "react-redux";
import { UserActionTypes } from "./redux/reducers/user/user.types";
//Firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase.utils";
//Components
import Home from "./pages/home/homepage.component";
import Login from "./pages/login/login.component";
import Register from "./pages/register/register.component";
import CompleteRegister from "./pages/register-complete/register-complete.component";
import Header from "./components/navigation/header.component";
import ForgotPassword from "./pages/forgot-password/forgot-password.component";
import { useHistory } from "react-router-dom";
const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      const idTokenResult = await user.getIdTokenResult();
      dispatch({
        type: UserActionTypes.LOGGED_IN_USER,
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });
      history.push("/");
    }
  });
  //get current user and store to redux user
  useEffect(() => {
    console.log(
      process.env.REACT_APP_REGISTER_REDIRECT_URL,
      process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL
    );
    return () => unsubscribe();
  }, [unsubscribe]);
  return (
    <div>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={CompleteRegister} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
      </Switch>
    </div>
  );
};

export default App;
