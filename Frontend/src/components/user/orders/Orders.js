import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { clearErrors, getMyOrders } from "../../../redux/actions/orderAction";
import MetaData from "../../MetaData";

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 80vh;
  padding: 1rem;
  font-family: "roboto";
  table {
    width: 100%;
    border: 1px solid lightgray;
    margin-top: 1rem;
    tr {
      transition: all 0.4s ease-in;
      th {
        padding: 10px 0;
        border-bottom: 1px solid #cfcfcf;
      }

      td {
        padding: 10px 5px;
        text-align: center;
      }
      .link {
        /* background-color: lightblue; */
        a {
          padding: 7px 10px;
          background-color: orange;
          color: black;
          font-size: 1rem;
          text-decoration: none;
          border-radius: 4px;
          font-weight: 600;
        }
      }
    }
  }

  @media screen and (max-width: 730px) {
    padding: 10px 4px;
    table tr .amount {
      display: none;
      background-color: lightblue;
    }
  }
  @media screen and (max-width: 470px) {
    table tr .exDel {
      display: none;
      background-color: lightblue;
    }
  }
  @media screen and (max-width: 420px) {
    table {
      font-size: 0.8rem;
      tr {
        .link {
          /* background-color: lightblue; */
          a {
            padding: 4px 5px;
            font-size: 0.71rem;
            border-radius: 2px;
          }
        }
      }
    }
  }
`;

function Orders() {
  const { isLoading, error, orders } = useSelector((state) => state.myOrders);
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getMyOrders());
  }, [dispatch, error, alert]);

  return (
    <>
      <MetaData title="orders" />
      <Container>
        {isLoading ? (
          <h1>Loading</h1>
        ) : (
          <>
            <h1>My Orders</h1>
            <table>
              <tr>
                <th>Order ID</th>
                <th>Status</th>
                <th className="amount">Amount</th>
                <th className="exDel">Created At</th>
                <th>View</th>
              </tr>
              {orders &&
                orders.map((order) => {
                  return (
                    <tr>
                      <td className="orderId">{order._id}</td>
                      <td
                        className="status"
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
                        {order.orderStatus}
                      </td>
                      <td className="amount">{order.totalAmount}</td>
                      <td className="exDel">
                        {order.createdAt
                          ? order.createdAt.substring(0, 10)
                          : ""}
                      </td>
                      <td className="link">
                        <Link to={`/order/${order._id}`}>View</Link>
                      </td>
                    </tr>
                  );
                })}
            </table>
          </>
        )}
      </Container>
    </>
  );
}

export default Orders;
