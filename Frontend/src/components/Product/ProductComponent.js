import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../layout/loader/Loader";
import { useAlert } from "react-alert";
import { Pagination } from "@mui/material";
import { clearErrors, getProducts } from "../../redux/actions/productAction";
import ProductCard from "./ProductCard";
import { useParams } from "react-router-dom";
import actionTypes from "../../redux/constats/actionTypes";
import styled from "styled-components";
import { getCategoryName } from "../../helper";

const ProductComponentWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  .productsList {
    width: 90%;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
    justify-content: space-evenly;
    min-height: 70vh;
    gap: 10px;
  }
`;

function ProductComponent() {
  const alert = useAlert();
  const { keyword } = useParams();
  const dispatch = useDispatch();
  let {
    products,
    isLoading,
    error,
    productsCount,
    itemsPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const { currPage, activeCategory, price, ratings } = useSelector(
    (state) => state.searchConstraints
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [alert, error, dispatch]);

  useEffect(() => {
    dispatch(getProducts(keyword, currPage, activeCategory, price, ratings));
  }, [dispatch, keyword, currPage, activeCategory, price, ratings]);

  return (
    <ProductComponentWrapper>
      {isLoading === true ? (
        <Loader />
      ) : (
        <div style={{ width: "100%", padding: "3px" }}>
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
                onChange={(e, val) => {
                  dispatch({
                    type: actionTypes.CHANGE_CURR_PAGE,
                    payload: val,
                  });
                }}
              />
            </div>
          )}
        </div>
      )}
    </ProductComponentWrapper>
  );
}

export default ProductComponent;
