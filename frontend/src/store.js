import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducer,
  productReducer,
  newReviewReducer,
  productsReducer,
  changeProductReducer,
  productReviewsReducer,
  newProductReducer,
  reviewReducer,
} from "./reducers/productReducer";
import {
  allUsersReducer,
  profileReducer,
  userReducer,
  forgotPasswordReducer,
  userDetailsReducer,
} from "./reducers/userReducer";
import {
  allOrdersReducer,
  newOrderReducer,
  myOrdersReducer,
  orderDetailsReducer,
  orderReducer,
} from "./reducers/orderReducer";
import { cartReducer } from "./reducers/cartReducer";
const reducer = combineReducers({
  products: productReducer,
  productsA: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  allOrders: allOrdersReducer,
  allUsers: allUsersReducer,
  changeProduct: changeProductReducer,
  newProduct: newProductReducer,
  order: orderReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleWare = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);
export default store;
