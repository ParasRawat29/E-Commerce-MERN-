import React from "react";
import { Link, useNavigate } from "react-router-dom";
import person from "../../../assets/icons/person.svg";

function SignedOutLinks() {
  const navigate = useNavigate();
  return (
    <div>
      <Link to="/signin">
        <button className="loginBtn">Login</button>
      </Link>
    </div>
  );
}

export default SignedOutLinks;
