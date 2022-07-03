import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getProductDetails,
} from "../../../redux/actions/productAction";
import { addItemToCart } from "../../../redux/actions/cartAction";
import styled from "styled-components";
import ReactStars from "react-rating-stars-component";
import Review from "../../Product/reviews/Review";
import MetaData from "../../MetaData";
import { useNavigate, useLocation } from "react-router-dom";
import { useAlert } from "react-alert";
import SubmitReview from "../../Product/reviews/SubmitReview";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import actionTypes from "../../../redux/constats/actionTypes";
import { CircularProgress } from "@mui/material";
import ProductImages from "../../Product/productDetails/ProductImages";
import { getCategoryName } from "../../../helper";

// STYLING FOR THIS COMPONENT
const Container = styled.div`
  box-sizing: border-box;

  font-family: "Urbanist";
  width: 100%;

  display: flex;
  flex-direction: row;
  padding: 1rem;
  justify-content: space-evenly;
  @media screen and (max-width: 800px) {
    flex-direction: column;
    padding: 0;
    align-items: center;
  }
`;
const LeftWrapper = styled.div`
  width: 60%;
  max-width: 600px;
  min-width: 300px;
  padding: 0.5rem;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  align-items: center;
  .imageWrapper {
    /* background-color: lightblue; */
    padding: 10px 5px;
    height: min-content;
    .CarouselImage {
      width: 100%;
      /* min-height: 320px; */
      max-height: 500px;
      height: 90%;
      object-fit: contain;
    }
  }

  @media screen and (max-width: 800px) {
    width: fit-content;
    justify-content: center;
    height: auto;
    padding: 0;
    img {
      min-height: fit-content;
    }
  }
`;
const RightWrapper = styled.div`
  padding: 2rem 0rem;
  /* display: flex; */
  width: 40%;
  .buttonsWrapper {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 10px;
    button {
      width: 40%;
      font-size: 1.1rem;
      padding: 5px 10px;
      border-radius: 4px;
      background-color: inherit;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      &:active {
        transform: scale(0.96);
      }
    }
    .editBtn {
      color: purple;
      border: 2px solid purple;
      &:hover {
        background-color: #9b269b;
        color: white;
      }
    }
    .deleteBtn {
      color: indianred;
      border: 2px solid indianred;
      &:hover {
        background-color: indianred;
        color: white;
      }
    }
  }
  @media screen and (max-width: 800px) {
    width: 100%;
    justify-content: center;
    padding: 1rem;
  }
`;
const Title = styled.h1`
  font: 2rem "Urbanist";
  display: block;
`;

const Description = styled.p`
  font: 1.1rem Helvetica;
  /* background-color: lightcoral; */
  margin: 1rem;
`;

const Price = styled.h1`
  font-size: 1.7rem;
  font-family: "Roboto";
`;

const RatingsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  & > span {
    color: gray;
    margin-left: 7px;
    padding: 2px 3px;
  }
`;

function AdminProductDetails() {
  const { productId } = useParams();
  const { product, isLoading } = useSelector((state) => state.productDetails);
  const { isDeleted, isLoading: adminLoading } = useSelector(
    (state) => state.allAdminProducts
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const options = {
    edit: false,
    activeColor: "#ffd700",
    value: product ? product.ratings : 0,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 30,
  };

  const handleDeleteProduct = () => {
    dispatch(deleteProduct(productId));
  };

  const handleEditProduct = () => {
    console.log("here");
    return navigate("/admin/createProduct", {
      state: { isEdit: true, productDetails: product },
      replace: false,
    });
  };

  useEffect(() => {
    if (isDeleted) {
      alert.success("product Deleted");
      dispatch({ type: actionTypes.DELETE_PRODUCT_RESET });
      navigate("/admin/allProducts");
    }
    dispatch(getProductDetails(productId));
  }, [dispatch, productId, isDeleted, alert, navigate]);

  return (
    <>
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <>
          {product && (
            <Container>
              <MetaData title={`${product.name}__ECOM`} />
              <LeftWrapper>
                <ProductImages product={product} />
              </LeftWrapper>
              <RightWrapper>
                <Title>{product.name}</Title>
                <Description>{product.description}</Description>
                <Price> ₹ {product.price}</Price>
                <RatingsWrapper>
                  <ReactStars {...options} />
                  <span>({product.numberOfReviews} reviews)</span>
                </RatingsWrapper>

                <div style={{ margin: "2rem 0 ", fontSize: "1.2rem" }}>
                  Category :
                  <span style={{ fontWeight: "700", color: "gray" }}>
                    {getCategoryName(product.category)}
                  </span>
                </div>
                <div style={{ margin: "2rem 0 ", fontSize: "1.2rem" }}>
                  Staus :{" "}
                  {product.stock > 0 ? (
                    <span style={{ color: "green" }}>In Stock</span>
                  ) : (
                    <span style={{ color: "indianred" }}>Out of Stock</span>
                  )}
                </div>
                <div className="buttonsWrapper">
                  {adminLoading ? (
                    <CircularProgress />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <button
                        className="deleteBtn"
                        onClick={handleDeleteProduct}
                      >
                        <DeleteOutlineTwoToneIcon />
                        Delete
                      </button>
                      <button className="editBtn" onClick={handleEditProduct}>
                        <EditTwoToneIcon />
                        Edit
                      </button>
                    </div>
                  )}
                </div>
                <h3 style={{ padding: "1rem 0", textDecoration: "underline" }}>
                  Rating and Reviews
                </h3>
                {product && product.reviews.length <= 0 ? (
                  <h3>No reviews</h3>
                ) : (
                  <>
                    {product.reviews.map((review) => (
                      <Review review={review} />
                    ))}
                  </>
                )}
              </RightWrapper>
            </Container>
          )}
        </>
      )}
    </>
  );
}

export default AdminProductDetails;
