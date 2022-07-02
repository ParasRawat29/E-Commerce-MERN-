import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Dashboard from "../admin/dashboard/Dashboard";
import AllOrders from "../admin/order/AllOrders";
import OrderDetailsAdmin from "../admin/order/OrderDetailsAdmin";
import AdminProductDetails from "../admin/product/AdminProductDetails";
import AllProducts from "../admin/product/AllProducts";
import CreateProduct from "../admin/product/CreateProduct";
import AllUsers from "../admin/user/AllUsers";

function AdminRoutes() {
  return (
    <div style={{ marginTop: "90px" }}>
      <Routes>
        <Route path="/admin/dashboard" exact element={<Dashboard />} />
        <Route path="/admin/allUsers" exact element={<AllUsers />} />
        <Route
          path="/admin/order/:orderId"
          exact
          element={<OrderDetailsAdmin />}
        />
        <Route path="/admin/allProducts" exact element={<AllProducts />} />
        <Route
          path="/admin/product/:productId"
          exact
          element={<AdminProductDetails />}
        />
        <Route path="/admin/allOrders" exact element={<AllOrders />} />
        <Route path="/admin/createProduct" exact element={<CreateProduct />} />
      </Routes>
    </div>
  );
}

export default AdminRoutes;
