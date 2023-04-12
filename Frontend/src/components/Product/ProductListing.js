import React, { Suspense } from "react";
import { lazy } from "react";
import { MainPageStyles } from "../MainPageStyles";
import MetaData from "../MetaData";
import Loader from "../layout/loader/Loader";
const ProductComponent = lazy(() => import("./ProductComponent"));

function ProductListing() {
  return (
    <MainPageStyles>
      <MetaData title="Products" />
      <Suspense fallback={<Loader />}>
        <ProductComponent />
      </Suspense>
    </MainPageStyles>
  );
}

export default ProductListing;
