import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "../layout/auth/Auth";
import Home from "../layout/home/Home";
import ProductDetails from "../Product/productDetails/ProductDetails";
import ProductListing from "../Product/ProductListing";
import MyCart from "../user/cart/MyCart";
import ConfirmOrder from "../user/cart/shipping/ConfirmOrder";
import Payment from "../user/cart/shipping/Payment";
import PaymentSuccess from "../user/cart/shipping/PaymentSuccess";
import Shipping from "../user/cart/shipping/Shipping";
import OrderDetails from "../user/orders/OrderDetails";
import Orders from "../user/orders/Orders";
import ChangePassword from "../user/profile/ChangePassword";
import Profile from "../user/profile/Profile";

function UserRoutes({ isSidebarOpen, setIsSidebarOpen }) {
  return (
    <div style={{ marginTop: "90px" }}>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route
          path="/products"
          exact
          element={
            <ProductListing
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          }
        />
        <Route
          path="/products/:keyword"
          element={
            <ProductListing
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          }
        />
        <Route path="/change/password" exact element={<ChangePassword />} />
        <Route path="/profile" exact element={<Profile />} />
        <Route path="/product/:productId" exact element={<ProductDetails />} />
        <Route path="/myCart" exact element={<MyCart />} />
        <Route path="/shipping" exact element={<Shipping />} />
        <Route path="/signin" exact element={<Auth />} />
        <Route path="/process/payment" exact element={<Payment />} />
        <Route path="/orders" exact element={<Orders />} />
        <Route path="/success" exact element={<PaymentSuccess />} />
        <Route path="/order/:orderId" exact element={<OrderDetails />} />
        <Route path="/order/confirm" exact element={<ConfirmOrder />} />

        <Route path="">404 NOT FOUND</Route>
      </Routes>
    </div>
  );
}

export default UserRoutes;
