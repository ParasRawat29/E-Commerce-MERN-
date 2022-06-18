import React from "react";
import styled from "styled-components";

const ProductWrapper = styled.div`
  width: 100%;
  height: fit-content;
  padding: 1rem;
  font-family: "roboto";
  margin-top: 1rem;
  -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.27);
  box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.27);
  .details {
    display: flex;
    flex-direction: row;
    img {
      width: 20%;
      min-width: 200px;
      height: auto;
    }
    .des {
      padding: 0 10px;
      width: 30%;
      min-width: 100px;
      .quantity {
        margin: 1rem 0;
        label {
          color: gray;
          font-family: "Readex Pro";
          font-weight: normal;
        }
      }
    }
    .shippingDetails {
      width: 40%;
      display: flex;
      flex-direction: column;
      label {
        color: gray;
        font-family: "Readex Pro";
      }
    }
  }

  @media screen and (max-width: 475px) {
    padding: 10px 0;
    .details {
      width: 100%;
      flex-direction: column;
      justify-content: center;
      img {
        width: 100%;
      }
      .des {
        margin: 5px 0px;
        padding: 0;
        h1 {
          font-size: 1.4rem;
        }
        .quantity {
          margin: 0;
        }
      }
      .shippingDetails {
        width: 100%;
        align-items: center;
        flex-direction: row;
      }
    }
  }
`;

function OrderItem({ product, shippingInfo }) {
  return (
    <ProductWrapper>
      <div className="details">
        <img src={product.image} alt="productImage" />
        <div className="des">
          <h1 className="productName">{product.name}</h1>
          <h3 className="quantity">
            <label>Quantity : </label> {product.quantity}
          </h3>
        </div>

        <div className="shippingDetails">
          <label>Delivery Address</label>
          <h3>
            {shippingInfo.address} {shippingInfo.city} {shippingInfo.state}
            {shippingInfo.country} {shippingInfo.pincode}
          </h3>
        </div>
      </div>
    </ProductWrapper>
  );
}

export default OrderItem;
