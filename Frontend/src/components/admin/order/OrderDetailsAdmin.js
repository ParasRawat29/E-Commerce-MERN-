import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmOrderDetails from "../../user/cart/shipping/ConfirmOrderDetails";
import { useParams } from "react-router-dom";
import {
  clearErrors,
  getOrderDetails,
  updateOrderStatus,
} from "../../../redux/actions/orderAction";
import styled from "styled-components";
import { useAlert } from "react-alert";
import actionTypes from "../../../redux/constats/actionTypes";

const Container = styled.div`
  display: flex;
  font-family: "roboto";
  .right {
    margin: 1rem auto;
    height: fit-content;
    h1 {
      text-align: center;
      padding: 10px 0;
      padding: 1.3rem 0;
      color: #837a7a;
      font-size: 1.5rem;
    }
    form {
      width: 100%;
      display: flex;
      flex-direction: column;
      max-width: 400px;

      select {
        font-size: 1.2rem;
        cursor: pointer;
        width: 80%;
        margin: auto;
        padding: 5px 10px;
        border: 1px solid lightgray;
        outline: none;
        option {
          cursor: pointer;
        }
      }
      .updateBtn {
        font-size: 1.5rem;
        width: 80%;
        padding: 15px 0px;
        margin: 1rem auto;
        border-radius: 10px;
        border: 2px solid #efa723;
        background-color: inherit;
        color: #efa723;
        font-weight: 700;
        cursor: pointer;
        &:active {
          transform: scale(0.98);
        }
        &:hover {
          background-color: #efa723;
          color: black;
        }
      }
    }
  }

  @media screen and (max-width: 670px) {
    flex-direction: column-reverse;
    .right {
      width: 100%;
      form {
        margin: auto;
        .updateBtn {
          padding: 5px 0px;
          font-size: 1.3rem;
        }
      }
    }
  }
`;

function OrderDetailsAdmin() {
  const { order, isUpdated, error } = useSelector(
    (state) => state.orderDetails
  );
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [updatedStatus, setUpdatedStatus] = useState("");
  console.log(order);
  const handleOrderStatusUpdate = (e) => {
    e.preventDefault();
    console.log(updatedStatus);
    dispatch(updateOrderStatus(orderId, updatedStatus));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Status Updated");
      dispatch(getOrderDetails(orderId));
      dispatch({ type: actionTypes.UPDATE_ORDER_RESET });
    }
  }, [dispatch, orderId, isUpdated, error, alert]);
  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, []);
  return (
    <Container>
      {order && order.user ? (
        <>
          <ConfirmOrderDetails
            user={order.user}
            shippingInfo={order.shippingInfo}
            cartItems={order.orderItems}
            isAdmin={true}
            order={order}
          />
          <div className="right">
            <h1>Update Order Status</h1>
            <form onSubmit={handleOrderStatusUpdate}>
              <select
                value={updatedStatus}
                onChange={(e) => setUpdatedStatus(e.target.value)}
              >
                <option value={null} disabled>
                  Choose
                </option>
                {order.orderStatus !== "Shipped" &&
                  order.orderStatus !== "Delivered" &&
                  order.orderStatus !== "Cancelled" && (
                    <option value="Processing">Processing</option>
                  )}
                {order.orderStatus !== "Delivered" &&
                  order.orderStatus !== "Cancelled" && (
                    <option value="Shipped">Shipped</option>
                  )}
                {order.orderStatus !== "Cancelled" && (
                  <option value="Delivered">Delivered</option>
                )}

                {order.orderStatus !== "Delivered" && (
                  <option value="Cancelled">Cancelled</option>
                )}
              </select>
              <button
                type="submit"
                className="updateBtn"
                disabled={order.orderStatus === updatedStatus}
              >
                Update
              </button>
            </form>
          </div>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
}

export default OrderDetailsAdmin;
