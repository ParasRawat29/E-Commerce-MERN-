import React from "react";
import MetaData from "../../../MetaData";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import CheckOutSteps from "./CheckOutSteps";

import ConfirmOrderDetails from "./ConfirmOrderDetails";
import { checkoutHandler } from "./logic";
import actionTypes from "../../../../redux/constats/actionTypes";
import SpinnerLoader from "../../../layout/loader/SpinnerLoader";

// styles for this container
const Container = styled.div`
  display: flex;
  min-height: 80vh;
  /* background-color: lightblue; */
  box-sizing: "border-box";
  .right {
    width: 40%;
    display: flex;
    justify-content: center;
    .orderDetails {
      font-family: "roboto";
      width: 100%;
      max-width: 500px;
      height: min-content;
      padding: 3px 15px;
      display: flex;
      flex-direction: column;
      align-items: center;

      & > h1 {
        padding: 10px;
        border-bottom: 2px solid black;
      }
      .details {
        width: 100%;
        display: flex;
        max-width: 400px;
        flex-direction: column;
        padding: 5px 0 10px 0;
        border-bottom: 2px solid black;
        .subTotal,
        .shippingCharge,
        .gst {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          margin: 10px 0px;
        }
        .subTotal h3,
        .shippingCharge h3,
        .gst h3 {
          display: inline;
          font-weight: normal;
        }
      }
      .toalAmt {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 10px 0px;
        max-width: 400px;
        font-weight: 700;
      }
      .paymentBtn {
        width: 100%;
        max-width: 300px;
        padding: 10px;
        font-size: 1.2rem;
        background-color: orange;
        font-weight: 700;
        cursor: pointer;
        &:active {
          transform: scale(0.94);
        }
      }
    }
  }

  @media screen and (max-width: 770px) {
    flex-direction: column-reverse;
    .left,
    .right {
      margin: 1rem 0;
      width: 100%;
      border: none;
    }
    .left {
      .shipingInfoWrapper {
        /* width: 100%; */
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
              }
              .quantityWrapper {
                width: 100%;
              }
            }
          }
        }
      }
    }
    .right {
      padding: 7px;
      .orderDetails {
        border-bottom: 1px solid gray;
        padding-bottom: 2rem;
      }
    }
  }
`;

function ConfirmOrder() {
  const { user, isLoading } = useSelector((state) => state.user);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalCartPrice = cartItems.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);
  const shippingCharge = Number(totalCartPrice >= 500 ? 0 : 70);
  const gst = Math.round(totalCartPrice * 0.18 * 100) / 100;
  const totalAmt =
    Math.round((totalCartPrice + shippingCharge + gst) * 100) / 100;

  const proceedToPayment = (e) => {
    const data = {
      totalCartPrice,
      shippingCharge,
      gst,
      totalAmt,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    checkoutHandler(totalAmt, user, shippingInfo);
  };

  return (
    <>
      <MetaData title="confirm order" />
      <CheckOutSteps activeStep={1} />
      <Container>
        {isLoading ? (
          <h1>Loading</h1>
        ) : (
          <>
            {user ? (
              <>
                <ConfirmOrderDetails
                  user={user}
                  shippingInfo={shippingInfo}
                  cartItems={cartItems}
                  totalAmount={totalCartPrice}
                  isAdmin={false}
                />

                <section className="right">
                  <div className="orderDetails">
                    <h1>Order Summary</h1>
                    <div className="details">
                      <div className="subTotal">
                        <span>Subtotal</span>
                        <h3>{totalCartPrice}</h3>
                      </div>
                      <div className="shippingCharge">
                        <span>Shipping Charge</span>
                        <h3>{shippingCharge}</h3>
                      </div>
                      <div className="gst">
                        <span>GST</span>
                        <h3>{gst}</h3>
                      </div>
                    </div>
                    <div className="toalAmt">
                      <span>Total</span>
                      <h3>{totalAmt}</h3>
                    </div>
                    <button className="paymentBtn" onClick={proceedToPayment}>
                      <>Pay ${totalAmt}</>
                    </button>
                  </div>
                </section>
              </>
            ) : (
              <SpinnerLoader />
            )}
          </>
        )}
      </Container>
    </>
  );
}

export default ConfirmOrder;
