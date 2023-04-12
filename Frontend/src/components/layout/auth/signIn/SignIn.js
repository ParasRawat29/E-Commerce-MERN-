import React, { useEffect, useState } from "react";
import { SignInStyle } from "./signInStyle";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../../../redux/actions/userAction";
import { useAlert } from "react-alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [details, setDetails] = useState({ email: "", password: "" });
  const { error, isLoading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(details.email, details.password));
    return;
  };

  const handleDemoUserLogin = (e) => {
    e.preventDefault();
    dispatch(login("parasrawat29pr@gmail.com", "00000"));
    return;
  };

  const handleDemoAdminLogin = (e) => {
    e.preventDefault();
    dispatch(login("def@gmail.com", "00000"));
    return;
  };

  const handleChange = (e) => {
    const ele = e.target.name;
    setDetails((pre) => {
      return {
        ...pre,
        [ele]: e.target.value,
      };
    });
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
  }, [error, alert, clearErrors]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/products");
    }
  }, [isAuthenticated, navigate]);
  return (
    <>
      <SignInStyle>
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
            <div class="signin-form">
              <form>
                <div class="form-group">
                  <input
                    autoComplete="off"
                    required
                    type="text"
                    class="form-control"
                    name="email"
                    value={details.email}
                    onChange={handleChange}
                    id="email"
                  />
                  <label htmlFor="email">{makeSpan("Email")}</label>
                </div>
                <div class="form-group">
                  <input
                    id="password"
                    type="password"
                    name="password"
                    class="form-control"
                    required
                    value={details.password}
                    onChange={handleChange}
                  />
                  <label htmlFor="password">{makeSpan("Password")}</label>
                </div>
                <button type="submit" class="submitBtn" onClick={handleSubmit}>
                  Login
                </button>

                <button
                  type="submit"
                  style={{ background: "lightcoral" }}
                  class="submitBtn"
                  onClick={handleDemoUserLogin}
                >
                  Demo User Login
                </button>
                <button
                  type="submit"
                  style={{ background: "lightcoral" }}
                  class="submitBtn"
                  onClick={handleDemoAdminLogin}
                >
                  Demo Admin Login
                </button>
              </form>
            </div>
          </>
        )}
      </SignInStyle>
    </>
  );
}

export default SignIn;
