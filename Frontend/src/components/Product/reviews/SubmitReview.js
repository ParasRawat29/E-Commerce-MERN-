import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  clearErrors,
  createReview,
  getProductDetails,
  getProductReviews,
} from "../../../redux/actions/productAction";
import actionTypes from "../../../redux/constats/actionTypes";

// styles for this component
const Form = styled.form`
  /* background-color: lightcoral; */
  width: 100%;
  textarea {
    width: 100%;
    border: 2px solid gray;
    font-size: 1rem;
    padding: 3px 5px;
    outline: none;
    width: 100%;
    height: auto;
    transition: all 0.3s ease;
    resize: none;
    &:focus {
      border-color: #df911c;
    }
  }
  .ratingWrapper {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
    margin: 10px 0;
    label {
      display: flex;
      align-items: center;
      margin: 0 10px;
    }
  }
  .submitBtn,
  .cancelBtn {
    font-size: 1.1rem;
    padding: 8px 20px;
    background-color: orange;
    font-weight: 600;
    font-family: "Readex Pro";
    cursor: pointer;
    border-radius: 4px;
    float: right;
    margin: 0 10px;
    &:active {
      transform: scale(0.94);
    }
  }
  .cancelBtn {
    background-color: indianred;
  }
`;

function SubmitReview({ productId }) {
  const [review, setReview] = useState({ rating: 0, comment: "" });
  const [active, setActive] = useState(false);
  const { success, error } = useSelector((state) => state.newReview);
  const dispatch = useDispatch();
  const alert = useAlert();
  const handleRating = (val) => {
    setReview((pre) => {
      return {
        ...pre,
        rating: val,
      };
    });
  };

  const handleTextChange = (e) => {
    setActive(true);
    setReview((pre) => {
      return {
        ...pre,
        comment: e.target.value,
      };
    });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    console.log(review);
    dispatch(createReview(review, productId));
    setReview({ rating: 0, comment: "" });
    setActive(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("review submitted");
      dispatch(getProductReviews(productId));
      dispatch({ type: actionTypes.NEW_REVIEW_RESET });
    }
  }, [alert, dispatch, error, success]);
  return (
    <Form onSubmit={handleReviewSubmit}>
      <textarea
        type="text"
        rows={3}
        value={review.comment}
        placeholder="Submit review"
        onChange={handleTextChange}
        onClick={handleTextChange}
        required
      />

      {active ? (
        <>
          <div className="ratingWrapper">
            <label>Ratings:</label>
            <ReactStars classNames="stars" onChange={handleRating} size={30} />
          </div>
          <button className="submitBtn">Submit</button>
          <button className="cancelBtn" onClick={() => setActive(false)}>
            Cancel
          </button>
        </>
      ) : (
        <></>
      )}
    </Form>
  );
}

export default SubmitReview;
