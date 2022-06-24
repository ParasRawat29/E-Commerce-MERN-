import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MainPageStyles } from "../MainPageStyles";
import MetaData from "../MetaData";
import ProductComponent from "./ProductComponent";

function ProductListing() {
  const dispatch = useDispatch();

  const [, setCurrPage] = useState(1);
  const [, setActiveCategory] = useState("all");
  const [, setPrice] = useState([100, 50000]);
  const [, setRatings] = useState(0);

  return (
    <MainPageStyles>
      <MetaData title="Products" />
      <ProductComponent />
    </MainPageStyles>
  );
}

export default ProductListing;
