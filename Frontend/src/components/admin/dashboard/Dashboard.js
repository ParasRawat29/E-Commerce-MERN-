import React, { useState } from "react";
import styled from "styled-components";
import AdminSidebar from "../AdminSidebar";
import ArChart from "./ArChart";
import DoChart from "./DoChart";
import Widget from "./Widget";

const Container = styled.div`
  min-height: 87vh;
  height: max-content;
  position: relative;

  .dashboardWrapper {
    transition: all 0.3s ease-in-out;
    padding: 1rem 0 0 2rem;

    .widgetsWrapper {
      display: flex;
      flex: 2;
      flex-wrap: wrap;
      justify-content: space-evenly;
    }
    .charts {
      margin-top: 3rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      /* padding: 10px; */
      align-items: center;
    }
  }

  @media screen and (max-width: 650px) {
    .dashboardWrapper {
      padding: 0;
      .charts {
        flex-direction: column;
      }
    }
  } ;
`;

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Container>
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        active="dashboard"
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
          className="dashboardWrapper"
          style={{ marginLeft: sidebarOpen ? "220px" : "0" }}
        >
          <div className="widgetsWrapper">
            <Widget type="users" />
            <Widget type="orders" />
            <Widget type="products" />
          </div>
          <div className="charts">
            <ArChart title="Users " aspect={2 / 1} />
            <DoChart title="Products" aspect={2 / 1} />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Dashboard;
