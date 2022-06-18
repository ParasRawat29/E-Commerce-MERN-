import React, { useEffect } from "react";
import { useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearErrors, signup } from "../../../../redux/actions/userAction";
import { SignUpStyles } from "./signUpStyles";
import CircularProgress from "@mui/material/CircularProgress";

function SignUp() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, isLoading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [signUpDetails, setSignUpDetails] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleSignUpChange = (e) => {
    const ele = e.target.name;
    setSignUpDetails((pre) => {
      return {
        ...pre,
        [ele]: e.target.value,
      };
    });
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();

    dispatch(
      signup(signUpDetails.name, signUpDetails.email, signUpDetails.password)
    );
  };

  const makeSpan = (name) => {
    return name
      .split("")
      .map((letter, id) => (
        <span style={{ transitionDelay: `${id * 50}ms` }}>{letter}</span>
      ));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate("/products");
    }
  }, [error, isAuthenticated, dispatch, alert, navigate]);

  return (
    <SignUpStyles>
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
          <CircularProgress color="secondary" size={160} />
        </div>
      ) : (
        <>
          <div class="signup-form">
            <br />
            <form onSubmit={handleSignUpSubmit}>
              <div class="form-group">
                <input
                  autoComplete="off"
                  required
                  type="text"
                  class="form-control"
                  name="name"
                  value={signUpDetails.name}
                  onChange={handleSignUpChange}
                  id="name"
                />
                <label htmlFor="name">{makeSpan("Name")}</label>
              </div>
              <div class="form-group">
                <input
                  autoComplete="off"
                  required
                  type="text"
                  class="form-control"
                  name="email"
                  value={signUpDetails.email}
                  onChange={handleSignUpChange}
                  id="email"
                />
                <label htmlFor="email">{makeSpan("Email")}</label>
              </div>
              <div class="form-group">
                <input
                  id="password"
                  type="password"
                  class="form-control"
                  name="password"
                  required
                  value={signUpDetails.password}
                  onChange={handleSignUpChange}
                />
                <label htmlFor="password">{makeSpan("Password")}</label>
              </div>
              <button
                type="submit"
                class="submitBtn"
                onClick={handleSignUpSubmit}
              >
                Sign Up
              </button>
            </form>
          </div>
        </>
      )}
    </SignUpStyles>
  );
}

export default SignUp;
