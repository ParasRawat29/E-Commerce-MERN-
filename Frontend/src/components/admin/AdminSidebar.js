import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CategoryIcon from "@mui/icons-material/Category";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";

const Sidebar = styled.div`
  height: 100%;
  position: absolute;
  border-right: 1px solid lightgray;
  top: 0;
  left: 0;
  width: 220px;
  background-color: #fdfdfd;
  display: flex;
  flex-direction: column;
  font-family: "Readex Pro";
  transition: all 0.3s ease-in-out;
  padding: 40px 10px 10px 10px;
  transform: ${(props) =>
    props.sidebarOpen ? "translateX(0%)" : "translateX(-100%)"};
  z-index: 100;
  a,
  button,
  .dropdown a {
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    padding: 5px 3px 5px 10px;
    margin: 10px 0;
    /* background-color: #ffdba6; */
    border-radius: 10px;
    text-decoration: none;
    font-weight: 600;
    color: black;
    font-family: "Readex Pro";
    .icon {
      font-size: 1.5rem;
      margin: 0 5px 0 0;
      color: #e93c5d;
    }
  }
  .active {
    background-color: #ffdba6a6;
  }
  button {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    background-color: inherit;
    margin-bottom: 0;
    .icon {
      transition: all 0.3s ease-in-out;
    }
    .icon.up {
      transform: rotate(0);
    }
    .icon.down {
      transform: rotate(180deg);
    }
  }
  .dropdown {
    display: flex;
    flex-direction: column;
    width: 70%;
    /* background-color: red; */
    margin-left: auto;
    a {
      font-size: 1rem;
      margin: 2px 0;
    }
  }
`;

function AdminSidebar({ sidebarOpen, setSidebarOpen, active }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Sidebar sidebarOpen={sidebarOpen}>
      <button
        style={{
          width: "min-content",
          position: "absolute",
          top: "0",
          margin: "0",
        }}
        onClick={() => setSidebarOpen((pre) => !pre)}
      >
        ☰
      </button>
      <Link
        to="/admin/dashboard"
        className={`${active === "dashboard" ? "active" : ""}`}
      >
        <DashboardIcon className="icon" /> Dashboard
      </Link>
      <button onClick={() => setIsOpen((pre) => !pre)}>
        <CategoryIcon className="icon" /> Products
        <ArrowDropUpIcon className={`icon ${isOpen ? "up" : "down"}`} />
      </button>
      {isOpen ? (
        <div className="dropdown">
          <Link
            to="/admin/allProducts"
            className={`${active === "all" ? "active" : ""}`}
          >
            <AppsOutlinedIcon className="icon" /> All
          </Link>
          <Link
            to="/admin/createProduct"
            className={`${active === "create" ? "active" : ""}`}
          >
            <CreateOutlinedIcon className="icon" /> Create
          </Link>
        </div>
      ) : (
        <></>
      )}
      <Link
        to="/admin/allUsers"
        className={`${active === "users" ? "active" : ""}`}
      >
        <PersonOutlineIcon className="icon" />
        Users
      </Link>
      <Link
        to="/admin/allOrders"
        className={`${active === "orders" ? "active" : ""}`}
      >
        <LocalMallOutlinedIcon className="icon" />
        Orders
      </Link>
    </Sidebar>
  );
}

export default AdminSidebar;
