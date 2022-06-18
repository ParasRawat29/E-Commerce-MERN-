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
  return (
    <div className="reviewCard">
      <div className="reviewLeft">
        <div className="img">
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.explicit.bing.net%2Fth%3Fid%3DOIP.kZkoTj6isA7ZHIpx5W2HHgHaHa%26pid%3DApi&f=1"
            alt="userImg"
            width="50px"
            height="50px"
          />
        </div>
      </div>
      <div className="reviewRight">
        <div className="userInfo">
          <p className="username">{review.name}</p>
          <p className="reviewDate">{review.date}fdsdfd</p>
        </div>
        <ReactStars {...options} />
        <p>{review.comment}</p>
      </div>
    </div>
  );
}

export default Review;
