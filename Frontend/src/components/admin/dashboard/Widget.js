import React from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import styled from "styled-components";
import { useSelector } from "react-redux";

const WidgetWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 240px;
  margin: 10px 0;
  height: 150px;
  padding: 10px;
  font-family: "Readex Pro";
  -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
  box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);

  .left,
  .right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .left {
    .title {
      font-weight: bold;
      font-size: 14px;
      color: rgb(160, 160, 160);
      font-family: "roboto";
    }

    .counter {
      font-size: 28px;
      font-weight: 300;
    }

    .link {
      width: max-content;
      font-size: 12px;
      border-bottom: 1px solid gray;
    }
  }

  .right {
    .icon {
      font-size: 25px;
      padding: 5px;
      border-radius: 5px;
      align-self: flex-end;
    }
    .percentage {
      display: flex;
      align-items: center;
      font-size: 14px;

      &.positive {
        color: green;
      }
      &.negative {
        color: red;
      }
    }
  }
`;

function Widget({ type }) {
  let data = {};
  const diff = 4;
  const { productsCount } = useSelector((state) => state.products);

  switch (type) {
    case "users":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: (
          <PersonOutlineIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "orders":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "View all orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "products":
      data = {
        title: "PRODUCTS",
        isMoney: false,
        link: "View all Products",
        amount: productsCount,
        icon: (
          <DescriptionOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "indianred",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <WidgetWrapper>
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.amount || 0}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </WidgetWrapper>
  );
}

export default Widget;
