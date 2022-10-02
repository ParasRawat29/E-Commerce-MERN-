import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
const AllOrders = lazy(() => import("../admin/order/AllOrders"));
const OrderDetailsAdmin = lazy(() =>
  import("../admin/order/OrderDetailsAdmin")
);
const AdminProductDetails = lazy(() =>
  import("../admin/product/AdminProductDetails")
);
const AllProducts = lazy(() => import("../admin/product/AllProducts"));
const CreateProduct = lazy(() => import("../admin/product/CreateProduct"));
const AllUsers = lazy(() => import("../admin/user/AllUsers"));
const Dashboard = lazy(() => import("../admin/dashboard/Dashboard"));

function AdminRoutes() {
  return (
    <div style={{ marginTop: "90px" }}>
      <Suspense fallback={<div>Loading...</div>}>
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
          <Route
            path="/admin/createProduct"
            exact
            element={<CreateProduct />}
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default AdminRoutes;
