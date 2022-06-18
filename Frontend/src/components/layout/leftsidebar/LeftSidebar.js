import React from "react";
import { LeftsidebarStyles } from "./leftsidebarStyles";
import { useNavigate } from "react-router-dom";
import { Slider } from "@mui/material";

function LeftSidebar({
  isSidebarOpen,
  activeCategory,
  setActiveCategory,
  price,
  setPrice,
  ratings,
  setRatings,
}) {
  const sidebarStyles = {
    transform: isSidebarOpen ? "translate(0)" : "translate(-100%)",
  };

  const navigate = useNavigate();
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  return (
    <LeftsidebarStyles>
      <div className="leftSidebarWrapper" style={sidebarStyles}>
        <div className="categoryWrapper">
          <ul>
            <li
              className={`${activeCategory === "home" ? "activeCategory" : ""}`}
            >
              <button onClick={() => navigate("/")}>
                <span>🏠 </span>
                <p>home</p>
              </button>
            </li>
            <li
              className={`${activeCategory === "all" ? "activeCategory" : ""}`}
            >
              <button onClick={() => setActiveCategory("all")}>
                <span>🐛 </span>
                <p>all</p>
              </button>
            </li>
            <li
              className={`${
                activeCategory === "electronics" ? "activeCategory" : ""
              }`}
            >
              <button onClick={() => setActiveCategory("electronics")}>
                <span>⚡ </span>
                <p>electronics</p>
              </button>
            </li>
            <li
              className={`${
                activeCategory === "jewelry" ? "activeCategory" : ""
              }`}
            >
              <button onClick={() => setActiveCategory("jewelry")}>
                <span>💎 </span>
                <p>jewelery</p>
              </button>
            </li>
            <li
              className={`${
                activeCategory === "mensClothing" ? "activeCategory" : ""
              }`}
            >
              <button onClick={() => setActiveCategory("mensClothing")}>
                <span>👕 </span>
                <p>men's clothing</p>
              </button>
            </li>
            <li
              className={`${
                activeCategory === "womensClothing" ? "activeCategory" : ""
              }`}
            >
              <button onClick={() => setActiveCategory("womensClothing")}>
                <span>👗 </span>
                <p>women's clothing</p>
              </button>
            </li>
          </ul>
        </div>
        <div className="filterWrapper">
          <h4>Filters</h4>
          <div style={{ padding: "5px" }}>
            <p className="subHead">Price💰 : </p>
            <Slider
              value={price}
              onChange={priceHandler}
              getAriaLabel={() => "Temperature range"}
              min={0}
              max={25000}
              valueLabelDisplay="auto"
              color="secondary"
            />
          </div>
          <div style={{ padding: "5px" }}>
            <p className="subHead">Ratings Above ⭐ : </p>
            <Slider
              value={ratings}
              onChange={(e, val) => setRatings(val)}
              min={0}
              max={5}
              valueLabelDisplay="auto"
              color="secondary"
            />
          </div>
        </div>
      </div>
    </LeftsidebarStyles>
  );
}

export default LeftSidebar;
