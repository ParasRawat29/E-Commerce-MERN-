import React, { useState } from "react";
import { AuthStyles } from "./authStyles";
import SignIn from "./signIn/SignIn";
import SignUp from "./signup/SignUp";

function Auth() {
  const [activeTab, setActiveTab] = useState("signin");

  return (
    <AuthStyles>
      <div className="authWrapper">
        <div className="authContainer">
          <div className="toggleWrapper">
            <button
              className={`${activeTab === "signin" ? "activeTab" : ""}`}
              onClick={() => {
                setActiveTab("signin");
              }}
            >
              SignIn
            </button>
            <button
              className={`${activeTab === "signup" ? "activeTab" : ""}`}
              onClick={() => {
                setActiveTab("signup");
              }}
            >
              Register
            </button>
            <div
              className={`activeLine ${
                activeTab === "signin" ? "left" : "right"
              }`}
            ></div>
          </div>
          <div className="main" style={{ height: "100%" }}>
            {activeTab === "signin" ? <SignIn /> : <SignUp />}
          </div>
        </div>
      </div>
    </AuthStyles>
  );
}

export default Auth;
