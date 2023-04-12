import React, { Suspense, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../../redux/actions/productAction";
import { addItemToCart } from "../../../redux/actions/cartAction";
import styled from "styled-components";
import ReactStars from "react-rating-stars-component";
import MetaData from "../../MetaData";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import actionTypes from "../../../redux/constats/actionTypes";
import { lazy } from "react";
import SpinnerLoader from "../../layout/loader/SpinnerLoader";
const SubmitReview = lazy(() => import("../reviews/SubmitReview"));
const AllReviews = lazy(() => import("../reviews/AllReviews"));
const ProductImages = lazy(() => import("./ProductImages"));

// STYLING FOR THIS COMPONENT
const Container = styled.div`
  box-sizing: border-box;
  font-family: "Urbanist";
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 1rem;
  justify-content: space-evenly;
  .leftWrapper {
    width: 40%;
    max-width: 600px;
    min-width: 300px;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    /* background-color: lightgreen; */
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
    @media screen and (max-width: 870px) {
      width: fit-content;
      justify-content: center;
      height: auto;
      padding: 0;
    }
  }
  @media screen and (max-width: 870px) {
    flex-direction: column;
    padding: 0;
    align-items: center;
  }
`;
const RightWrapper = styled.div`
  padding: 2rem 0rem;
  /* display: flex; */
  width: 50%;
  max-width: 600px;
  @media screen and (max-width: 870px) {
    width: 100%;
    justify-content: center;
    padding: 1rem;
  }
`;
const Title = styled.h1`
  font: 2rem "Urbanist";
  display: block;
  @media screen and (max-width: 870px) {
    font: 1.5rem "Urbanist";
  }
`;

const Description = styled.p`
  font: 1.1rem Helvetica;
  margin: 1rem;
`;

const Price = styled.h1`
  font-size: 1.7rem;
  font-family: "Roboto";
`;

const FilterContainer = styled.div`
  display: flex;
  width: 50%;
  margin: 30px 10px;
  justify-content: space-between;
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
  margin: 0 1rem;
`;
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0 min(5px, 0.8rem);
  cursor: pointer;
`;
const FilterTitle = styled.span`
  font-size: 1.3rem;
  font-weight: lighter;
`;

const QuantityWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  max-width: 200px;
  margin: 0 2rem;
`;
const Quantity = styled.span`
  display: inline;
  font-size: 1.1rem;
  margin: 0 10px;
`;

const Button = styled.button`
  width: 30px;
  height: 30px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 2rem;
  outline: none;
  border: none;
  cursor: pointer;
  box-shadow: 4px 10px 16px -2px rgba(0, 0, 0, 0.52);
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
const AddToCartButton = styled.button`
  font-size: 1.3rem;
  font-weight: 600;
  font-family: "Urbanist";
  padding: 10px 50px;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  display: block;
  background-color: #ebde43;
  color: black;
  margin-bottom: 1rem;
  transition: all 0.2s ease-in;
  &:hover {
    transform: scale(1.1);
  }
`;

function ProductDetails() {
  const [itemInCart, setItemInCart] = useState(false);
  const [text, setText] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams();
  const { cartItems } = useSelector((state) => state.cart);
  const { product, isLoading } = useSelector((state) => state.productDetails);

  const { isDeleted, isLoading: adminLoading } = useSelector(
    (state) => state.allAdminProducts
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const doesItemExistInCart = useCallback(() => {
    cartItems.forEach((item) => {
      if (item.productId === productId) {
        setItemInCart(true);
        setText("Item In Cart");
      }
    });
  }, [cartItems, productId]);

  const options = {
    edit: false,
    activeColor: "#ffd700",
    value: product ? product.ratings : 0,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 30,
  };

  const handleAddToCartClick = () => {
    if (itemInCart) {
      navigate("/myCart");
    } else {
      dispatch(addItemToCart(productId, quantity));
      setItemInCart(true);
      alert.success("Item Added to Cart");
    }
  };

  useEffect(() => {
    if (isDeleted) {
      alert.success("product Deleted");
      dispatch({ type: actionTypes.DELETE_PRODUCT_RESET });
      navigate("/admin/allProducts");
    }
    dispatch(getProductDetails(productId));
  }, [dispatch, productId, isDeleted, alert, navigate]);

  useEffect(() => {
    if (product) {
      if (product.stock > 0) {
        setText("Add to Cart");
      } else {
        setText("Out Of Stock");
      }
    }
  }, [product]);

  useEffect(() => {
    if (cartItems) {
      doesItemExistInCart();
    }
  }, [cartItems, doesItemExistInCart]);

  return (
    <>
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <>
          {product && (
            <Container>
              <Suspense fallback={<SpinnerLoader />}>
                <MetaData title={`${product.name}__ECOM`} />
                <div className="leftWrapper">
                  <ProductImages product={product} />
                </div>

                <RightWrapper>
                  <Title>{product.name}</Title>
                  <Description>{product.description}</Description>
                  <Price> ₹ {product.price}</Price>
                  <RatingsWrapper>
                    <ReactStars {...options} />
                    <span>({product.numberOfReviews} reviews)</span>
                  </RatingsWrapper>
                  <FilterContainer>
                    <Filter>
                      <FilterTitle>Color: </FilterTitle>
                      <FilterColor color="gray" />
                      <FilterColor color="yellow" />
                      <FilterColor color="black" />
                    </Filter>
                  </FilterContainer>
                  <QuantityWrapper>
                    <Button
                      onClick={() =>
                        setQuantity((pre) => {
                          if (pre === product.stock) return pre;
                          else return pre + 1;
                        })
                      }
                    >
                      +
                    </Button>
                    <Quantity>{quantity}</Quantity>
                    <Button
                      onClick={() =>
                        setQuantity((pre) => {
                          if (pre === 1) {
                            return 1;
                          } else return pre - 1;
                        })
                      }
                    >
                      -
                    </Button>
                  </QuantityWrapper>

                  <div style={{ margin: "2rem 0 ", fontSize: "1.2rem" }}>
                    Staus :{" "}
                    {product.stock > 0 ? (
                      <span style={{ color: "green" }}>In Stock</span>
                    ) : (
                      <span style={{ color: "indianred" }}>Out of Stock</span>
                    )}
                  </div>

                  <AddToCartButton
                    onClick={handleAddToCartClick}
                    disabled={product.stock < 1 ? true : false}
                  >
                    {product.stock < 1
                      ? "Out of Stock"
                      : itemInCart
                      ? "Go to Cart"
                      : "Add to Cart"}
                  </AddToCartButton>

                  <h3
                    style={{ padding: "2rem 0", textDecoration: "underline" }}
                  >
                    Rating and Reviews
                  </h3>
                  <SubmitReview productId={productId} />

                  {product && product.reviews.length <= 0 ? (
                    <h3>No reviews</h3>
                  ) : (
                    <AllReviews />
                  )}
                </RightWrapper>
              </Suspense>
            </Container>
          )}
        </>
      )}
    </>
  );
}

export default ProductDetails;
