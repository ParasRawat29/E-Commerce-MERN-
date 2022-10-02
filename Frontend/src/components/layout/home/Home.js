import React, { Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../ErrorBoundary";
const MetaData = lazy(() => import("../../MetaData"));
const Footer = lazy(() => import("./Footer"));
const GridListing = lazy(() => import("./GridListing"));

const Slider = lazy(() => import("./Slider"));

function Home() {
  return (
    <div>
      <ErrorBoundary FallbackComponenet={ErrorFallback} onReset={() => {}}>
        <Suspense fallback={<div>Loading...</div>}>
          <MetaData title="Ecommerce" />
          <Slider />
          <GridListing />
          <Footer />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default Home;
