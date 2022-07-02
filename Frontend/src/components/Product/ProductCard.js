import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getCategoryName } from "../../helper";

const ProductCardWrapper = styled(Link)`
  display: flex;
  flex: 1 0 230px;
  width: 50%;
  padding: 4px;
  margin: 10px;
  max-width: 260px;
  border-radius: 10px;
  text-decoration: none;

  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    justify-content: center;
    width: 100%;
    max-width: 500px;
    min-width: 190px;
    max-height: 420px;
    min-height: 210px;
    color: "black";
    text-decoration: "none";
    border-radius: 10px;
    padding: 5px;
    background-color: white;
    border: 1px solid rgb(210, 210, 210);
    transition: all 0.5s ease-in-out;
    &:hover {
      transform: scale(1.02);
      -webkit-box-shadow: 5px 5px 14px -1px rgba(0, 0, 0, 0.57);
      box-shadow: 5px 5px 14px -1px rgba(0, 0, 0, 0.57);
    }
    .productImg {
      aspect-ratio: 1;
      width: 100%;
      max-height: "250px";
      max-width: "300px";
      object-fit: "contain";
    }
    .cardBody {
      display: flex;
      flex-direction: column;
      margin-top: 4px;
      padding-left: 10px;
      width: calc(100% - 10px);
      font-family: "Roboto";

      .cardTitle {
        color: black;
        font-size: 1.1rem;
        margin: 10px 0;
        padding: 3px;
        min-height: 48px;
      }
      .cardPrice {
        margin: 0 0 10px 0;
        font-size: 1.5rem;
        color: #2a6c45;
      }
      .cardCategory {
        color: #777373;
        font-weight: 700;
        margin-bottom: 6px;
      }
    }
  }

  @media screen and (max-width: 540px) {
    max-width: 1000px;
    min-width: 100%;
    .card {
      min-width: 100%;
      padding: 3px;
      flex-direction: row;
      .productImg {
        height: 100%;
        width: 50%;
      }
      .cardBody {
        height: 100%;
      }
    }
  }
`;

function ProductCard({ product, isAdmin }) {
  const options = {
    edit: false,
    activeColor: "#ffd700",
    value: 2.5,
    isHalf: true,
    size: window.innerWidth < 600 ? 15 : 20,
  };
  options.value = product.ratings;
  return (
    <ProductCardWrapper
      to={isAdmin ? `/admin/product/${product._id}` : `/product/${product._id}`}
    >
      <div key={product._id} class="card">
        <img
          src={product?.images[0]?.image_url}
          class="productImg"
          alt={product.name}
        />
        <div class="cardBody">
          <h5 class="cardTitle">
            {product.name.length > 24
              ? product.name.substr(0, 24) + "..."
              : product.name}
          </h5>

          <h3 className="cardPrice">₹ {product.price} </h3>
          <div
            style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
          >
            <ReactStars {...options} />
            <span
              style={{
                color: "gray",
                fontSize: "0.9rem",
                display: "inline",
                marginLeft: "10px",
              }}
            >
              ( {product.numberOfReviews} Reviews )
            </span>
          </div>
          <small class="cardCategory">
            {getCategoryName(product.category)}
          </small>
        </div>
      </div>
    </ProductCardWrapper>
  );
}

export default ProductCard;
