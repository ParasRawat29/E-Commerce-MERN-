import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import MetaData from "../../../MetaData";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import KeyIcon from "@mui/icons-material/Key";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import {
  clearErrors,
  createOrder,
} from "../../../../redux/actions/orderAction";
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
      border-bottom: 1px solid black;
    }
    form {
      padding-top: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      .inputGroup {
        border: 2px solid black;
        width: 80%;
        display: flex;
        align-items: center;
        margin: 0.7rem 0;
        position: relative;
        padding: 0 10px;
        input {
          height: 100%;
          width: 90%;
          font-size: 1.2rem;
          padding: 10px 15px;
          outline: none;
          border: none;
          background: transparent;
          z-index: 1;
        }
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        & > label {
          position: absolute;
          top: 14px;
          left: 40px;
          font-size: 0.9rem;
          font-weight: 900;
          letter-spacing: 1px;
          background: inherit;
          transition: all 0.3s ease-in-out;
          color: gray;
          user-select: none;
          padding: 0 3px;
          z-index: 0;
        }

        input:valid + label,
        input:focus + label {
          transform: translate(-6px, -24px);
          font-size: 0.7rem;
          color: #fab700;
          background-color: white;
          z-index: 1;
        }
      }

      button {
        box-sizing: border-box;
        width: 90%;
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
  }
`;
function Payment() {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const dispatch = useDispatch();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
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
    const order = {
      shippingInfo,
      orderItems: cartItems,
      itemsPrice: orderInfo.totalCartPrice,
      taxPrice: orderInfo.gst,
      shippingPrice: orderInfo.shippingCharge,
      totalAmount: orderInfo.totalAmt,
      orderStatus: "Processing",
      paymentInfo: {
        id: Math.random() * 1000000,
        status: "paid",
      },
    };
    btnRef.current.disabled = false;
    dispatch(createOrder(order));
    navigate("/success");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      console.log(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <>
      <MetaData title="Payment" />
      <CheckOutSteps activeStep={2} />
      <Container>
        <div className="PaymentWrapper">
          <h2>Payment</h2>
          <form onSubmit={handleSubmit}>
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
          </form>
        </div>
      </Container>
    </>
  );
}

export default Payment;
