import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import SpinnerLoader from "../layout/loader/SpinnerLoader";
const Home = lazy(() => import("../layout/home/Home"));
const Auth = lazy(() => import("../layout/auth/Auth"));
const ProductDetails = lazy(() =>
  import("../Product/productDetails/ProductDetails")
);
const ProductListing = lazy(() => import("../Product/ProductListing"));
const ConfirmOrder = lazy(() => import("../user/cart/shipping/ConfirmOrder"));
const Payment = lazy(() => import("../user/cart/shipping/Payment"));
const PaymentSuccess = lazy(() =>
  import("../user/cart/shipping/PaymentSuccess")
);
const Shipping = lazy(() => import("../user/cart/shipping/Shipping"));
const OrderDetails = lazy(() => import("../user/orders/OrderDetails"));
const MyCart = lazy(() => import("../user/cart/MyCart"));
const Orders = lazy(() => import("../user/orders/Orders"));
const Profile = lazy(() => import("../user/profile/Profile"));
const ChangePassword = lazy(() => import("../user/profile/ChangePassword"));

function UserRoutes({ isSidebarOpen, setIsSidebarOpen }) {
  return (
    <div style={{ marginTop: "90px" }}>
      <Suspense fallback={<SpinnerLoader />}>
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
          <Route
            path="/product/:productId"
            exact
            element={<ProductDetails />}
          />
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
      </Suspense>
    </div>
  );
}

export default UserRoutes;
