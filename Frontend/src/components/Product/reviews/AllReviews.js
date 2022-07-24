import React from "react";
import { useSelector } from "react-redux";
import Review from "./Review";
import CircularProgress from "@mui/material/CircularProgress";
function AllReviews() {
  const { reviews, isLoading } = useSelector((state) => state.productReviews);

  return (
    <>
      {isLoading ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="secondary" size={60} />
        </div>
      ) : (
        reviews.map((review) => <Review review={review} isAdmin={false} />)
      )}
    </>
  );
}

export default AllReviews;
