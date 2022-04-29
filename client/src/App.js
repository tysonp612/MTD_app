//React
import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
//Redux
import { useDispatch } from "react-redux";
import { UserActionTypes } from "./redux/reducers/user/user.types";
//Firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase.utils";
//Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; //in node_modules
//Privet Routes
import { UserRoute } from "./components/routes/user.routes";
import { AdminRoute } from "./components/routes/admin.routes";

//Server Utils
import { createOrUpdateUser } from "./utils/authentication/authentication.utils";

//Components
import Home from "./pages/home/homepage.component";
import DrawerComponent from "./components/drawer/drawer.component";
import Header from "./components/header/header.component";
//Authentication
import Login from "./pages/login/login.component";
import Register from "./pages/register/register.component";
import CompleteRegister from "./pages/register-complete/register-complete.component";
import ForgotPassword from "./pages/forgot-password/forgot-password.component";
//Pages
import { ProductPage } from "./pages/product/product.component";
import { CategoriesPage } from "./pages/categories/categories.component";
import { SubCategoriesPage } from "./pages/sub-categories/sub-categories.component";
import { ShopPage } from "./pages/shop/shop.component";
import { CartPage } from "./pages/cart/cart.page";
import { CheckoutPage } from "./pages/check-out/check-out.page";
import { PaymentPage } from "./pages/payment/payment.page";
//User Pages
import History from "./pages/user/user.history.component";
import Password from "./pages/user/user.password.component";
import Wishlist from "./pages/user/user.wishlist.component";
//Admin Pages
import { AdminDashboard } from "./pages/admin/admin.dashboard/admin.dashboard.component";
import { AdminCategory } from "./pages/admin/admin.category/admin.category.component";
import { AdminSubCategory } from "./pages/admin/admin.sub-category/admin.sub-category.component";
import { AdminProducts } from "./pages/admin/admin.products/admin.products";
import { AdminShowProduct } from "./pages/admin/admin.products/admin.showproducts";
import { ProductUpdate } from "./pages/admin/admin.products/admin.product-update";
import { CouponPage } from "./pages/admin/admin.coupon/admin.coupon.component";
const App = () => {
  const dispatch = useDispatch();

  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      const idTokenResult = await user.getIdTokenResult();
      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: UserActionTypes.LOGGED_IN_USER,
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          // roleBasedRedirect(res.data.role, history);
        })
        .catch((error) => console.log(error));
    }
  });
  //get current user and store to redux user
  useEffect(() => {
    return () => unsubscribe();
  }, [unsubscribe]);

  return (
    <div>
      <Header />
      <DrawerComponent />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={CompleteRegister} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <Route exact path="/product/:slug" component={ProductPage} />
        <Route exact path="/category/:slug" component={CategoriesPage} />
        <Route exact path="/sub-category/:slug" component={SubCategoriesPage} />
        <Route exact path="/shop" component={ShopPage} />
        <Route exact path="/cart" component={CartPage} />

        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/coupon" component={CouponPage} />
        <AdminRoute exact path="/admin/products" component={AdminProducts} />
        <AdminRoute
          exact
          path="/admin/showproducts"
          component={AdminShowProduct}
        />
        <AdminRoute
          exact
          path="/admin/product/:slug"
          component={ProductUpdate}
        />
        <AdminRoute exact path="/admin/category" component={AdminCategory} />
        <AdminRoute exact path="/admin/sub" component={AdminSubCategory} />
        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/password" component={Password} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        <UserRoute exact path="/checkout" component={CheckoutPage} />
        <UserRoute exact path="/payment" component={PaymentPage} />
      </Switch>
    </div>
  );
};

export default App;
