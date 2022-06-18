import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProducts } from "../../redux/actions/productAction";
import LeftSidebar from "../layout/leftsidebar/LeftSidebar";
import { MainPageStyles } from "../MainPageStyles";
import MetaData from "../MetaData";
import ProductComponent from "./ProductComponent";

function ProductListing({ isSidebarOpen, setIsSidebarOpen }) {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const [currPage, setCurrPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("all");
  const [price, setPrice] = useState([0, 5000]);
  const [ratings, setRatings] = useState(0);

  useEffect(() => {
    dispatch(getProducts(keyword, currPage, activeCategory, price, ratings));
  }, [dispatch, keyword, currPage, activeCategory, price, ratings]);

  return (
    <MainPageStyles>
      <MetaData title="Products" />
      <LeftSidebar
        price={price}
        setPrice={setPrice}
        isSidebarOpen={isSidebarOpen}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        ratings={ratings}
        setRatings={setRatings}
      />
      <div
        className="rightPanel"
        style={{ marginLeft: isSidebarOpen ? "240px" : "0px" }}
      >
        <ProductComponent currPage={currPage} setCurrPage={setCurrPage} />
      </div>
    </MainPageStyles>
  );
}

export default ProductListing;
