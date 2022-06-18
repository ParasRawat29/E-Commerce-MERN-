import React from "react";
import "./loader.css";
function Loader() {
  const arr = new Array(8).fill(1);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {arr.map((item) => (
        <div className="cardLoad">
          <img className="productImgLoad" />
          <div className="cardBodyLoad">
            <h5 className="cardTitleLoad"></h5>
            <h3 className="cardPriceLoad"></h3>
            <div>
              <span
                style={{
                  color: "gray",
                  fontSize: "0.9rem",
                  display: "inline",
                }}
              ></span>
            </div>
            <small class="cardCategoryLoad"></small>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Loader;
