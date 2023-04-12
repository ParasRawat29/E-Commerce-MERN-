import React from "react";
import loading from "../../../assets/images/loading.gif";

function SpinnerLoader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={loading} width={"80px"} height={"80px"} />
    </div>
  );
}

export default SpinnerLoader;
