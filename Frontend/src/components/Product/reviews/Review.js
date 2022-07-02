import React from "react";
import ReactStars from "react-rating-stars-component";
import "./review.css";
function Review({ review }) {
  const options = {
    edit: false,
    activeColor: "#ffd700",
    value: review ? review.rating : 0,
    isHalf: true,
    size: window.innerWidth < 600 ? 15 : 20,
  };
  console.log("review ------------------->", review);
  return (
    <div className="reviewCard">
      <div className="reviewLeft">
        <div className="img">
          <img
            src={review.user.avatar.image_url}
            alt="userImg"
            width="50px"
            height="50px"
          />
        </div>
      </div>
      <div className="reviewRight">
        <div className="userInfo">
          <p className="username">{review.name}</p>
          <p className="reviewDate">{review.createdAt.substr(0, 10)}</p>
        </div>
        <ReactStars {...options} />
        <p className="comment">{review.comment}</p>
      </div>
    </div>
  );
}

export default Review;
