import React, { useEffect, useState } from "react";
import Header from "./components/layout/header/Header";
import { Route, Routes, useParams } from "react-router-dom";
import ProductListing from "./components/Product/ProductListing";
import ProductDetails from "./components/Product/ProductDetails";
import MyCart from "./components/user/cart/MyCart";
import Auth from "./components/layout/auth/Auth";
import Home from "./components/layout/home/Home";
import Profile from "./components/user/profile/Profile";
import ChangePassword from "./components/user/profile/ChangePassword";
import Shipping from "./components/user/cart/shipping/Shipping";
import ConfirmOrder from "./components/user/cart/shipping/ConfirmOrder";
import Payment from "./components/user/cart/shipping/Payment";
import PaymentSuccess from "./components/user/cart/shipping/PaymentSuccess";
import Orders from "./components/user/orders/Orders";
import OrderDetails from "./components/user/orders/OrderDetails";
import Dashboard from "./components/admin/dashboard/Dashboard";
import RequireAdminAuth from "./components/routes/RequireAdminAuth";
import AllUsers from "./components/admin/user/AllUsers";
import AllProducts from "./components/admin/product/AllProducts";
import CreateProduct from "./components/admin/product/CreateProduct";
import AllOrders from "./components/admin/order/AllOrders";
import OrderDetailsAdmin from "./components/admin/order/OrderDetailsAdmin";
import AdminProductDetails from "./components/admin/product/AdminProductDetails";

import { useDispatch } from "react-redux";
import { loadUser } from "./redux/actions/userAction";
import LeftSidebar from "./components/layout/leftsidebar/LeftSidebar";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <div className="App" style={{ overflowX: "hidden" }}>
      <Header
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <LeftSidebar isSidebarOpen={isSidebarOpen} />
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
          <Route
            path="/admin/dashboard"
            exact
            element={
              <RequireAdminAuth redirectTo="/signin">
                <Dashboard />
              </RequireAdminAuth>
            }
          />
          <Route
            path="/admin/allUsers"
            exact
            element={
              <RequireAdminAuth redirectTo="/signin">
                <AllUsers />
              </RequireAdminAuth>
            }
          />
          <Route
            path="/admin/order/:orderId"
            exact
            element={
              <RequireAdminAuth redirectTo="/signin">
                <OrderDetailsAdmin />
              </RequireAdminAuth>
            }
          />
          <Route
            path="/admin/allProducts"
            exact
            element={
              <RequireAdminAuth redirectTo="/signin">
                <AllProducts />
              </RequireAdminAuth>
            }
          />
          <Route
            path="/admin/product/:productId"
            exact
            element={
              <RequireAdminAuth redirectTo="/signin">
                <AdminProductDetails />
              </RequireAdminAuth>
            }
          />
          <Route
            path="/admin/allOrders"
            exact
            element={
              <RequireAdminAuth redirectTo="/signin">
                <AllOrders />
              </RequireAdminAuth>
            }
          />
          <Route
            path="/admin/createProduct"
            exact
            element={
              <RequireAdminAuth redirectTo="/signin">
                <CreateProduct />
              </RequireAdminAuth>
            }
          />
          <Route path="">404 NOT FOUND</Route>
        </Routes>
      </div>
    </div>
    // </div>
  );
}

export default App;
