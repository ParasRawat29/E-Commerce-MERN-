import { combineReducers } from "redux";
import { cartReducer } from "./cartReducers";
import {
  allOrdersReducer,
  myOrderReducer,
  newOrderReducer,
  orderDetailsReducer,
} from "./orderReducer";
import {
  newProductReducer,
  ReviewReducer,
  productDetailsReducer,
  productReducer,
  allAdminProductsReducer,
  searchConstriantsReducer,
  productReviewsReducer,
} from "./productReducer";
import {
  allUsersReducer,
  profileReducer,
  userDetailReducer,
  userReducer,
} from "./userReducer";

export const rootReducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  productReviews: productReviewsReducer,
  cart: cartReducer,
  user: userReducer,
  profile: profileReducer,
  newOrder: newOrderReducer,
  myOrders: myOrderReducer,
  orderDetails: orderDetailsReducer,
  newReview: ReviewReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailReducer,
  allOrders: allOrdersReducer,
  newProduct: newProductReducer,
  allAdminProducts: allAdminProductsReducer,
  searchConstraints: searchConstriantsReducer,
});
