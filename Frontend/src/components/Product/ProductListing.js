import React, { Suspense } from "react";
import { lazy } from "react";
import { MainPageStyles } from "../MainPageStyles";
import MetaData from "../MetaData";
const ProductComponent = lazy(() => import("./ProductComponent"));

function ProductListing() {
  return (
    <MainPageStyles>
      <MetaData title="Products" />
      <Suspense fallback={<div>Loading...</div>}>
        <ProductComponent />
      </Suspense>
    </MainPageStyles>
  );
}

export default ProductListing;
