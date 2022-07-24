import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styled from "styled-components";
import {
  clearErrors,
  deleteReview,
  getProductDetails,
  getProductReviews,
} from "../../../redux/actions/productAction";
import { CircularProgress } from "@mui/material";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import actionTypes from "../../../redux/constats/actionTypes";

const Container = styled.div`
  position: absolute;
  top: 0rem;
  right: 1rem;
  .icon {
    cursor: pointer;
    float: right;
    clear: both;
  }
  .deleteBtn {
    font-size: 1rem;
    padding: 3px 15px;
    cursor: pointer;
    font-family: roboto;
  }
`;

function DeleteReviwesWrapper({ reviewId }) {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [open, setOpen] = useState(false);
  const { isDeleted, isLoading, error } = useSelector(
    (state) => state.newReview
  );

  const handleReviewDelete = () => {
    dispatch(deleteReview(productId, reviewId));
  };

  useEffect(() => {
    if (isDeleted) {
      alert.success("Review Deleted");
      console.log("here before --->", isDeleted);
      dispatch({ type: actionTypes.DELETE_REVIEW_RESET });
      console.log("here after--->", isDeleted);
      dispatch(getProductReviews(productId));
      dispatch(getProductDetails(productId));
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [isDeleted, error]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <MoreVertIcon className="icon" onClick={() => setOpen((pre) => !pre)} />
      {open && (
        <div className="box">
          <button className="deleteBtn" onClick={handleReviewDelete}>
            Delete
          </button>
        </div>
      )}
    </Container>
  );
}

export default DeleteReviwesWrapper;
