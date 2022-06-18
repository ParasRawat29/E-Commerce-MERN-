import React from "react";
import MetaData from "../../MetaData";
import Footer from "./Footer";
import GridListing from "./GridListing";

import Slider from "./Slider";

function Home() {
  return (
    <div>
      <MetaData title="Ecommerce" />
      <Slider />
      <GridListing />
      <Footer />
    </div>
  );
}

export default Home;
