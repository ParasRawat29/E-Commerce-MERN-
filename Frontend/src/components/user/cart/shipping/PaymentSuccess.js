import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import success from "../../../../assets/images/success.gif";
import { clearErrors } from "../../../../redux/actions/orderAction";
function PaymentSuccess() {
  const { error } = useSelector((state) => state.newOrder);
  const alert = useAlert();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      alert.error(error);
      console.log(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);
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
      <Link
        to="/orders"
        style={{
          backgroundColor: "orange",
          padding: "10px 20px",
          fontSize: "1.4rem",
          textDecoration: "none",
          color: "black",
          fontWeight: "800",
          cursor: "pointer",
          margin: "10px 0px",
        }}
      >
        Go to Orders
      </Link>
    </div>
  );
}

export default PaymentSuccess;
