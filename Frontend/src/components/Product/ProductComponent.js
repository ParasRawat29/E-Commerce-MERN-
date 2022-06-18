import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./scss/ProductComponent.css";
import Loader from "../layout/loader/Loader";
import { useAlert } from "react-alert";
import { Pagination } from "@mui/material";
import { clearErrors } from "../../redux/actions/productAction";
import ProductCard from "./ProductCard";

function ProductComponent({ currPage, setCurrPage }) {
  const alert = useAlert();
  const dispatch = useDispatch();
  let {
    products,
    isLoading,
    error,
    productsCount,
    itemsPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [alert, error, dispatch]);

  return (
    <div className="productComponentWrapper">
      {isLoading === true ? (
        <Loader />
      ) : (
        <div style={{ width: "100%" }}>
          <div className="productsList">
            {products &&
              products.map((product) => {
                return <ProductCard product={product} key={product._id} />;
              })}
          </div>

          {itemsPerPage <= filteredProductsCount && (
            <div
              className="pagination"
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "3rem 0 ",
              }}
            >
              <Pagination
                count={Math.ceil(productsCount / itemsPerPage)}
                page={currPage}
                onChange={(e, val) => setCurrPage(val)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductComponent;
