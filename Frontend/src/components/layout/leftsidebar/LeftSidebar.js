import React, { useEffect, useState } from "react";
import { LeftsidebarStyles } from "./leftsidebarStyles";
import { useLocation, useNavigate } from "react-router-dom";
import { Slider } from "@mui/material";
import actionTypes from "../../../redux/constats/actionTypes";
import { useDispatch, useSelector } from "react-redux";

function LeftSidebar({ isSidebarOpen }) {
  const sidebarStyles = {
    transform: isSidebarOpen ? "translate(0)" : "translate(-100%)",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("home");
  const { price, ratings } = useSelector((state) => state.searchConstraints);
  const location = useLocation();
  const priceHandler = (event, newPrice) => {
    dispatch({ type: actionTypes.CHANGE_PRICE, payload: newPrice });
  };

  const handleCategorySelect = (category) => {
    switch (category) {
      case "home":
        setActiveCategory("home");
        navigate("/");
        break;
      case "all":
        setActiveCategory("all");
        navigate("/products");
        break;
      case "electronics":
        setActiveCategory("electronics");
        navigate("/products");
        break;
      case "jewelry":
        setActiveCategory("jewelry");
        navigate("/products");
        break;
      case "mensClothing":
        setActiveCategory("mensClothing");
        navigate("/products");
        break;
      case "womensClothing":
        setActiveCategory("womensClothing");
        navigate("/products");
        break;
      default:
        navigate("/");
    }
  };

  const handleRatingChange = (e, val) => {
    dispatch({ type: actionTypes.CHANGE_RATINGS, payload: val });
  };

  useEffect(() => {
    dispatch({
      type: actionTypes.CHANGE_ACTIVE_CATEGORY,
      payload: activeCategory,
    });
  }, [activeCategory, dispatch]);

  useEffect(() => {
    if (location.pathname.indexOf("/products") >= 0) setActiveCategory("all");
  }, [location.pathname]);

  // calculations to decide whether or not to show filter for price and ratings
  // we will only show filter when url have products in it and it is not admin products url

  const proRegex = /product|products|Product|Products/;
  const adminRegex = /admin/;
  const isProductsUrl = proRegex.test(location.pathname);
  const isAdminProductUrl = adminRegex.test(location.pathname);

  return (
    <LeftsidebarStyles>
      <div className="leftSidebarWrapper" style={sidebarStyles}>
        <div className="categoryWrapper">
          <ul>
            <li
              className={`${activeCategory === "home" ? "activeCategory" : ""}`}
            >
              <button
                onClick={() => {
                  handleCategorySelect("home");
                }}
              >
                <span>🏠 </span>
                <p>home</p>
              </button>
            </li>
            <li
              className={`${activeCategory === "all" ? "activeCategory" : ""}`}
            >
              <button
                onClick={() => {
                  handleCategorySelect("all");
                }}
              >
                <span>🐛 </span>
                <p>all</p>
              </button>
            </li>
            <li
              className={`${
                activeCategory === "electronics" ? "activeCategory" : ""
              }`}
            >
              <button
                onClick={() => {
                  handleCategorySelect("electronics");
                }}
              >
                <span>⚡ </span>
                <p>electronics</p>
              </button>
            </li>
            <li
              className={`${
                activeCategory === "jewelry" ? "activeCategory" : ""
              }`}
            >
              <button
                onClick={() => {
                  handleCategorySelect("jewelry");
                }}
              >
                <span>💎 </span>
                <p>jewelery</p>
              </button>
            </li>
            <li
              className={`${
                activeCategory === "mensClothing" ? "activeCategory" : ""
              }`}
            >
              <button
                onClick={() => {
                  handleCategorySelect("mensClothing");
                }}
              >
                <span>👕 </span>
                <p>men's clothing</p>
              </button>
            </li>
            <li
              className={`${
                activeCategory === "womensClothing" ? "activeCategory" : ""
              }`}
            >
              <button
                onClick={() => {
                  handleCategorySelect("womensClothing");
                }}
              >
                <span>👗 </span>
                <p>women's clothing</p>
              </button>
            </li>
          </ul>
        </div>
        {isProductsUrl && !isAdminProductUrl && (
          <div className="filterWrapper">
            <h4>Filters</h4>
            <div style={{ padding: "5px" }}>
              <p className="subHead">Price💰 : </p>
              <Slider
                value={price}
                onChange={priceHandler}
                getAriaLabel={() => "Temperature range"}
                min={0}
                max={70000}
                valueLabelDisplay="auto"
                color="secondary"
              />
            </div>
            <div style={{ padding: "5px" }}>
              <p className="subHead">Ratings Above ⭐ : </p>
              <Slider
                value={ratings}
                onChange={handleRatingChange}
                min={0}
                max={5}
                valueLabelDisplay="auto"
                color="secondary"
              />
            </div>
          </div>
        )}
      </div>
    </LeftsidebarStyles>
  );
}

export default LeftSidebar;
