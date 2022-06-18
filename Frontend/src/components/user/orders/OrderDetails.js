import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  clearErrors,
  getOrderDetails,
} from "../../../redux/actions/orderAction";
import MetaData from "../../MetaData";
import OrderItem from "./OrderItem";

const Container = styled.div`
  width: 100vw;
  height: max-content;
  min-height: 80vh;
  max-width: 1200px;
  margin: auto;
  font-family: "roboto";
  padding: 1rem;
  .ordersWrapper {
    display: flex;
    flex-direction: column;
    padding: 1rem 0;
    height: 100%;

    justify-content: center;
    max-width: 1200px;
    margin: auto;
    .details {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-content: center;
      h1 {
        font-size: 1.2rem;
        transition: all 0.3s ease;
      }
      h3 {
        label {
          color: gray;
          font-family: "Readex Pro";
          font-weight: normal;
        }
      }
    }
    h3 {
      padding: 10px 0;
      label {
        color: gray;
        font-family: "Readex Pro";
        font-weight: normal;
      }
    }
    .itemsWrapper {
      .head {
        color: gray;
        font-family: "Readex Pro";
        font-weight: normal;
        margin-top: 2rem;
        font-weight: 800;
      }
    }
  }

  @media screen and (max-width: 620px) {
    .ordersWrapper {
      .details {
        h1 {
          font-size: 0.91rem;
        }
        h3 {
          font-size: 0.81rem;
        }
      }
      h3 {
        padding: 10px 0;
        font-size: 0.91rem;
      }
    }
  }

  @media screen and (max-width: 475px) {
    .ordersWrapper {
      .details {
        flex-direction: column;
        h1 {
          font-size: 1rem;
        }
        h3 {
          font-size: 0.91rem;
        }
      }
      h3 {
        padding: 10px 0;
        font-size: 0.91rem;
      }
      .itemsWrapper {
        padding: 3px;
      }
    }
  }
`;

function OrderDetails() {
  const { order, isLoading, error } = useSelector(
    (state) => state.orderDetails
  );
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId, error]);

  return (
    <Container>
      <MetaData title={`order ${order._id}`} />
      {isLoading ? (
        <h1>Loading</h1>
      ) : order ? (
        <div className="ordersWrapper">
          <div className="details">
            <h1>
              <span>Order #</span> {order._id}
            </h1>
            <h3>
              <label>Placed On :</label>
              {order.createdAt ? order.createdAt.substring(0, 10) : ""}
            </h3>
          </div>
          <h3
            style={{
              color: `${
                order.orderStatus === "Delivered"
                  ? "green"
                  : order.orderStatus === "Canceled"
                  ? "indianred"
                  : ""
              }`,
            }}
          >
            <label>status:</label> {order.orderStatus}
          </h3>

          <div className="itemsWrapper">
            <label className="head">Items in Order</label>
            {order.orderItems &&
              order.orderItems.map((item) => {
                return (
                  <OrderItem product={item} shippingInfo={order.shippingInfo} />
                );
              })}
          </div>
        </div>
      ) : (
        <>No Order</>
      )}
    </Container>
  );
}

export default OrderDetails;
