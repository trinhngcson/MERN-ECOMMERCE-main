import "./App.css";
import axios from "axios";
import WebFont from "webfontloader";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import Login from "./component/User/Login";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import Payment from "./component/Cart/Payment.js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/admin/Dashboard.js";
import ProductList from "./component/admin/ProductList.js";
import UpdateProduct from "./component/admin/UpdateProduct.js";
import NewProduct from "./component/admin/NewProduct.js";
import OrderList from "./component/admin/OrderList.js";
import ProcessOrder from "./component/admin/ProcessOrder.js";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import UsersList from "./component/admin/UsersList";
import UpdateUser from "./component/admin/UpdateUser";
import ProductReviews from "./component/admin/ProductReviews";

function App() {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(loadStripe(data.stripeApiKey));
  }
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path="/me"
          element={
            <ProtectedRoute load={loading} isAuth={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/me/update"
          element={
            <ProtectedRoute load={loading} isAuth={isAuthenticated}>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/password/update"
          element={
            <ProtectedRoute load={loading} isAuth={isAuthenticated}>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />
        <Route exact path="/cart" element={<Cart />} />
        <Route
          exact
          path="/shipping"
          element={
            <ProtectedRoute load={loading} isAuth={isAuthenticated}>
              <Shipping />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/order/confirm"
          element={
            <ProtectedRoute load={loading} isAuth={isAuthenticated}>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />
        {stripeApiKey && (
          <Route
            exact
            path="/process/payment"
            element={
              <Elements stripe={stripeApiKey}>
                <ProtectedRoute load={loading} isAuth={isAuthenticated}>
                  <Payment />
                </ProtectedRoute>
              </Elements>
            }
          />
        )}
        <Route
          exact
          path="/success"
          element={
            <ProtectedRoute load={loading} isAuth={isAuthenticated}>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/orders"
          element={
            <ProtectedRoute load={loading} isAuth={isAuthenticated}>
              <MyOrders />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/order/:id"
          element={
            <ProtectedRoute load={loading} isAuth={isAuthenticated}>
              <OrderDetails />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/dashboard"
          element={
            <ProtectedRoute
              load={loading}
              isAuth={isAuthenticated}
              user={user}
              adminRoute={true}
              isAdmin={true}
            >
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/products"
          element={
            <ProtectedRoute
              load={loading}
              isAuth={isAuthenticated}
              user={user}
              adminRoute={true}
              isAdmin={true}
            >
              <ProductList />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/product/:id"
          element={
            <ProtectedRoute
              load={loading}
              isAuth={isAuthenticated}
              user={user}
              adminRoute={true}
              isAdmin={true}
            >
              <UpdateProduct />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/product"
          element={
            <ProtectedRoute
              load={loading}
              isAuth={isAuthenticated}
              user={user}
              adminRoute={true}
              isAdmin={true}
            >
              <NewProduct />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/orders"
          element={
            <ProtectedRoute
              load={loading}
              isAuth={isAuthenticated}
              user={user}
              adminRoute={true}
              isAdmin={true}
            >
              <OrderList />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/users"
          element={
            <ProtectedRoute
              load={loading}
              isAuth={isAuthenticated}
              user={user}
              adminRoute={true}
              isAdmin={true}
            >
              <UsersList />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/user/:id"
          element={
            <ProtectedRoute
              load={loading}
              isAuth={isAuthenticated}
              user={user}
              adminRoute={true}
              isAdmin={true}
            >
              <UpdateUser />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/reviews"
          element={
            <ProtectedRoute
              load={loading}
              isAuth={isAuthenticated}
              user={user}
              adminRoute={true}
              isAdmin={true}
            >
              <ProductReviews />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/order/:id"
          element={
            <ProtectedRoute
              load={loading}
              isAuth={isAuthenticated}
              user={user}
              adminRoute={true}
              isAdmin={true}
            >
              <ProcessOrder />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
