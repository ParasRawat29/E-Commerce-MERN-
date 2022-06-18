import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getAllOrders } from "../../../redux/actions/orderAction";
import AdminSidebar from "../AdminSidebar";

const Container = styled.div`
  min-height: 87vh;
  height: max-content;
  padding: 10px;
  position: relative;
  .mainContent {
    .ordersWrapper {
      max-width: 1200px;
      margin: auto;
      transition: all 0.3s ease-in-out;
      margin-left: ${(props) => (props.sidebarOpen ? "220px" : "100px")};
      table {
        font-family: "roboto";
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
            padding: 15px 5px;
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
    .mainContent {
      .ordersWrapper {
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
    }
  }
`;

function AllOrders() {
  const styles = {
    Delivered: "green",
    Shipped: "goldenrod",
    Cancelled: "indianred",
  };
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { allOrders: orders, isLoading } = useSelector(
    (state) => state.allOrders
  );

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <Container sidebarOpen={sidebarOpen}>
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        active="orders"
      />
      <div className="mainContent">
        <button
          style={{
            width: "min-content",
            position: "absolute",
            top: "0",
            fontSize: "1.2rem",
            background: "inherit",
            cursor: "pointer",
            padding: "5px 3px 5px 10px",
            fontWeight: "600",
          }}
          onClick={() => setSidebarOpen((pre) => !pre)}
        >
          ☰
        </button>
        <div
          className="ordersWrapper"
          style={{
            marginTop: "2rem",
          }}
        >
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
                            : order.orderStatus === "Cancelled"
                            ? "indianred"
                            : order.orderStatus === "Shipped"
                            ? "goldenrod"
                            : "black"
                        }`,
                      }}
                    >
                      {order.orderStatus}
                    </td>
                    <td className="amount">{order.totalAmount}</td>
                    <td className="exDel">
                      {order.createdAt ? order.createdAt.substring(0, 10) : ""}
                    </td>
                    <td className="link">
                      <Link to={`/admin/order/${order._id}`}>Edit</Link>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    </Container>
  );
}

export default AllOrders;
