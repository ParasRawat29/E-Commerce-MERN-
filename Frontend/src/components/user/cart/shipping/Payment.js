import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import MetaData from "../../../MetaData";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
// import {
//   clearErrors,
//   createOrder,
// } from "../../../../redux/actions/orderAction";
import CheckOutSteps from "./CheckOutSteps";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 75vh;
  font-family: "Roboto";

  .PaymentWrapper {
    width: 95%;
    max-width: 400px;
    h2 {
      text-align: center;
      padding-bottom: 1rem;
    }
    button {
      box-sizing: border-box;
      width: 100%;
      background-color: #ffb328;
      padding: 5px 10px;
      font-size: 1.3rem;
      font-weight: 700;
      cursor: pointer;
      color: black;
      &:hover {
        background-color: orange;
      }
      &:active {
        transform: scale(0.94);
      }
    }
  }
`;
function Payment() {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const btnRef = useRef();
  const navigate = useNavigate();
  const alert = useAlert();

  const paymentData = {
    amount: orderInfo ? Math.round(orderInfo.totalAmt * 100) : 0,
  };
  const { error } = useSelector((state) => state.newOrder);

  const handleSubmit = async (e) => {
    e.preventDefault();

    btnRef.current.disabled = true;

    // alert.success("Payment Successfull");

    btnRef.current.disabled = false;
    // dispatch(createOrder(order));
    navigate("/success");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      console.log(error);
      // dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <>
      <MetaData title="Payment" />
      <CheckOutSteps activeStep={2} />
      <Container>
        <div className="PaymentWrapper">
          <h2>Payment</h2>
          {/* <form onSubmit={handleSubmit}>
            <div className="inputGroup">
              <CreditCardIcon />
              <input className="paymentInput" required type="Number" />
              <label> Card Number</label>
            </div>
            <div className="inputGroup">
              <CalendarTodayIcon />
              <input className="paymentInput" required type="date" />
            </div>
            <div className="inputGroup">
              <KeyIcon />
              <input
                className="paymentInput"
                required
                type="text"
                maxLength={3}
                minLength={3}
              />

              <label>CVV</label>
            </div>
            <button type="submit" ref={btnRef}>
              Pay
              <span style={{ fontWeight: "normal" }}>
                ₹{paymentData.amount / 100}
              </span>
            </button>
          </form> */}

          <button type="submit" ref={btnRef}>
            Pay{" "}
            <span style={{ fontWeight: "normal" }}>
              ₹ {paymentData.amount / 100}
            </span>
          </button>
        </div>
      </Container>
    </>
  );
}

export default Payment;
