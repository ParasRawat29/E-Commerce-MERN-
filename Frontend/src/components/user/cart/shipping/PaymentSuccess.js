import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import success from "../../../../assets/images/success.gif";
import {
  clearErrors,
  createOrder,
} from "../../../../redux/actions/orderAction";
import { useSearchParams } from "react-router-dom";

function PaymentSuccess() {
  const { error } = useSelector((state) => state.newOrder);
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const searchQuery = useSearchParams()[0];
  const referenceId = searchQuery.get("referenceId");
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  useEffect(() => {
    if (referenceId && orderInfo && orderInfo.totalCartPrice > 0) {
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
      dispatch(createOrder(order));
      sessionStorage.removeItem("orderInfo");
    }
  }, []);

  useEffect(() => {
    if (error) {
      alert.error(error);
      console.log(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  if (!referenceId) {
    return navigate("/myCart", { replace: true });
  }

  return (
    <div
      style={{
        width: "100% ",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        fontFamily: "roboto",
      }}
    >
      <img src={success} alt="completed" width="300px" height="300px" />
      <h1>Your Order has been placed successfully</h1>
      <h3>reference id : {referenceId} </h3>
      <button
        to="/orders"
        style={{
          backgroundColor: "orange",
          padding: "10px 20px",
          fontSize: "1.4rem",
          textDecoration: "none",
          color: "black",
          fontWeight: "600",
          cursor: "pointer",
          margin: "10px 0px",
        }}
        onClick={() => {
          navigate("/orders", { replace: true });
        }}
      >
        Go to Orders
      </button>
    </div>
  );
}

export default PaymentSuccess;
