import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import {
  clearErrors,
  getAdminProducts,
} from "../../../redux/actions/productAction";
import AdminSidebar from "../AdminSidebar";
import { useAlert } from "react-alert";
import Loader from "../../layout/loader/Loader";
import ProductCard from "../../Product/ProductCard";

const Container = styled.div`
  min-height: 87vh;
  height: max-content;
  padding: 10px;
  position: relative;
  .mainContent {
    .allProductsWrapper {
      max-width: 1600px;
      margin: auto;
      transition: all 0.3s ease-in-out;
      margin-left: ${(props) => (props.sidebarOpen ? "220px" : "100px")};
      display: flex;
      flex-wrap: wrap;
    }
  }
`;

function AllProducts() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { products, isLoading, error } = useSelector(
    (state) => state.allAdminProducts
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAdminProducts());
  }, [alert, dispatch, error]);

  return (
    <Container sidebarOpen={sidebarOpen}>
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        active="all"
      />
      <div className="mainContent">
        <button
          style={{
            width: "min-content",
            position: "absolute",
            top: "0",
            fontSize: "1.2rem",
            background: "inherit",
            cursor: "pointer",
            padding: "5px 3px 5px 10px",
            fontWeight: "600",
          }}
          onClick={() => setSidebarOpen((pre) => !pre)}
        >
          ☰
        </button>
        <div
          className="allProductsWrapper"
          style={{
            marginTop: "2rem",
          }}
        >
          {isLoading ? (
            <Loader />
          ) : (
            products &&
            products.map((product) => (
              <ProductCard product={product} isAdmin={true} />
            ))
          )}
        </div>
      </div>
    </Container>
  );
}

export default AllProducts;
