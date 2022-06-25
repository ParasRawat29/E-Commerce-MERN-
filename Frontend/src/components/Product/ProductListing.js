import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { MainPageStyles } from "../MainPageStyles";
import MetaData from "../MetaData";
import ProductComponent from "./ProductComponent";

function ProductListing() {
  return (
    <MainPageStyles>
      <MetaData title="Products" />
      <ProductComponent />
    </MainPageStyles>
  );
}

export default ProductListing;
