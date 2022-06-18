import React from "react";
import styled from "styled-components";

const Section = styled.section`
  width: 60%;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  border-right: 1px solid gray;
  align-items: center;
  .top {
    width: 100%;
    display: flex;
    .shipingInfoWrapper {
      font-family: "roboto";
      width: ${(props) => (props.isAdmin ? "60%" : "90%")};
      margin: auto;
      padding: 0 0rem 1rem 10px;
      h1 {
        font-size: 1.5rem;
        font-weight: 600;
        font-family: "roboto";
        padding: 1rem 0;
        color: #837a7a;
      }
      .name,
      .phone,
      .address,
      .email {
        margin: 10px 0px;
        font-size: 1.1rem;
        label {
          font-size: 0.9rem;
          font-family: "Readex Pro";
          color: "gray";
        }
      }
    }
    .orderDetailsInfo {
      display: flex;
      flex-direction: column;
      /* background-color: lightcoral; */
      width: 40%;
      font-family: "roboto";
      padding: 0 0rem 1rem 10px;
      h1 {
        font-size: 1.5rem;
        font-weight: 600;
        font-family: "roboto";
        padding: 1rem 0;
        color: #837a7a;
      }
      .paymentInfo {
        .paymentStatus,
        .amount {
          margin: 10px 0px;
          font-size: 1.1rem;
          label {
            font-size: 0.9rem;
            font-family: "Readex Pro";
            color: black;
          }
        }
        .paymentStatus {
          color: green;
        }
      }
      .orderInfo {
        .orderStatus,
        .delivery {
          margin: 10px 0px;
          font-size: 1.1rem;
          label {
            font-size: 0.9rem;
            font-family: "Readex Pro";
            color: "gray";
          }
        }
      }
    }
  }
  .cartWrapper {
    width: 90%;
    & > h1 {
      font-weight: 600;
      font-family: "roboto";
      padding: 1rem 0;
      font-size: 1.5rem;
      color: #837a7a;
    }
    .cartItemsWrapper {
      display: flex;
      flex-direction: column;

      .productCard {
        display: flex;
        flex-direction: row;
        margin: 0;
        border-radius: 0;
        flex-grow: 1;
        margin: 5px 0;
        max-height: 150px;
        padding: 5px 10px;
        img {
          width: 10%;
          aspect-ratio: 1;
          max-width: 150px;
          min-height: 100px;
          min-width: 100px;
          object-fit: "contain";
        }
        .card {
          display: flex;
          flex-direction: row;
          width: 100%;
          align-items: center;
          border: none;
          font-family: "roboto";
          .productDes {
            padding: 1rem;
            width: 40%;
            min-width: 80px;
            .cardTitle {
              font-size: 1.3rem;
              text-align: center;
            }
            .productPrice {
              font-size: 1.3rem;
              color: gray;
            }
          }

          .quantityWrapper {
            padding: 3px;
            display: flex;
            align-self: center;
            width: 60%;
            justify-content: center;
            align-items: center;
            min-width: 100px;
            & > h3 {
              margin: 0 4px;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 840px) {
    .top {
      width: 100%;
      display: flex;
      flex-direction: column-reverse;
      .shipingInfoWrapper,
      .orderDetailsInfo {
        width: 100%;
      }
    }
  }
  @media screen and (max-width: 790px) {
    flex-direction: column;
    margin: 1rem 0;
    width: 100%;
    border: none;
    .shipingInfoWrapper {
      width: 100%;
    }
    .cartWrapper {
      width: 100%;
      .cartItemsWrapper {
        .productCard {
          margin: 4px 0;
          .card {
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            .productDes {
              width: 100%;
              .cardTitle {
                width: 100%;
                text-align: left;
              }
            }
            .quantityWrapper {
              width: 100%;
              justify-content: left;
              padding-left: 1rem;
            }
          }
        }
      }
    }
  }
`;

function ConfirmOrderDetails({
  user,
  shippingInfo,
  cartItems,
  order,
  isAdmin,
}) {
  const styles = {
    Delivered: "green",
    Shipped: "goldenrod",
    Cancelled: "indianred",
  };
  return (
    <Section className="left" isAdmin={isAdmin}>
      <div className="top">
        <div className="shipingInfoWrapper">
          <h1>Shipping Details</h1>
          <h2 className="name">
            <label>Name</label> : {user.name}
          </h2>
          <h3 className="phone">
            <label>Phone No.</label> : {shippingInfo.phoneNumber}
          </h3>
          <h3 className="address">
            <label>Address</label> :
            {` ${shippingInfo.address},${shippingInfo.city} , ${shippingInfo.state} , ${shippingInfo.country}, ${shippingInfo.pincode}`}
          </h3>
          <h3 className="email">
            <label>Email</label> :{user.email}
          </h3>
        </div>
        {isAdmin ? (
          <div className="orderDetailsInfo">
            <h1>Order Details</h1>
            <div className="paymentInfo">
              <h3 className="paymentStatus">
                <label>Payment Status</label>:
                {order && order.paymentInfo.status}
              </h3>
              <h3 className="amount">
                <label>Amount</label> : ₹ {order && order.totalAmount}
              </h3>
            </div>
            <div className="orderInfo">
              <h3 className="orderStatus">
                <label>Order Status : </label>
                <span style={{ color: styles[order.orderStatus] }}>
                  {order && order.orderStatus}
                </span>
              </h3>
              {order.orderStatus !== "Delivered" && (
                <h3 className="delivery">
                  <label>Expected Delivery</label> :{" "}
                  {order && order.expectedDelivery.substring(0, 10)}
                </h3>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="cartWrapper">
        <h1>Your Cart Items:</h1>
        <div className="cartItemsWrapper">
          {cartItems &&
            cartItems.map((item) => (
              <div className="productCard">
                <img src={item.image} alt={item.title} />
                <div className="card">
                  <div className="productDes">
                    <h2 className="cardTitle">{item.name}</h2>
                  </div>
                  <div className="quantityWrapper">
                    <span>{`${item.quantity} X ${
                      item.price || item.product.price
                    } =`}</span>
                    <h3>{`₹ ${
                      (item.price || item.product.price) * item.quantity
                    }`}</h3>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Section>
  );
}

export default ConfirmOrderDetails;
