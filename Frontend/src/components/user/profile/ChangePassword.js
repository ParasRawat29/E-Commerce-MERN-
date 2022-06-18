import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  clearErrors,
  loadUser,
  updatePassword,
} from "../../../redux/actions/userAction";
import actionTypes from "../../../redux/constats/actionTypes";

const ChangePasswordWapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Roboto";
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 95%;
    max-width: 500px;

    & > h1 {
      margin-bottom: 2rem;
      border-bottom: 1px solid black;
    }
    .input-group {
      border: 4px solid black;
      width: 80%;
      margin: 1rem 0;
      position: relative;
      input {
        height: 100%;
        width: 90%;
        font-size: 1.2rem;
        padding: 10px 15px;
        outline: none;
        border: none;
        background: transparent;
      }
      & > label {
        position: absolute;
        top: 10px;
        left: 10px;
        font-size: 0.9rem;
        font-weight: 900;
        letter-spacing: 1px;
        background: inherit;
        transition: all 0.3s ease-in-out;
        color: gray;
        user-select: none;
        padding: 0 3px;
        z-index: 1;
      }
      input:focus + label,
      input:valid + label {
        transform: translate(-6px, -18px);
        font-size: 0.7rem;
        color: #fab700;
        background-color: white;
        z-index: 1;
      }
    }
    .input-group input:focus + .input-group,
    .input-group input:valid + .input-group {
      border-color: green;
    }
    .updateBtn {
      font-size: 1.1rem;
      width: 100%;
      max-width: 270px;
      padding: 10px 10px;
      cursor: pointer;
      background: #6fe56f;
      outline: none;
      border: none;
      font-weight: 700;
      &:hover {
        background-color: #41a541;
      }
      &:active {
        transform: scale(0.98);
      }
    }
  }
`;

function ChangePassword() {
  const dispatch = useDispatch();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { error, isUpdated, isLoading } = useSelector((state) => state.profile);
  const alert = useAlert();
  const navigate = useNavigate();

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    // console.log(oldPassword, newPassword, confirmPassword);
    dispatch(updatePassword(oldPassword, newPassword, confirmPassword));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Password Updated");
      navigate("/profile");
      dispatch(loadUser());
      dispatch({ type: actionTypes.UPDATE_PROFILE_RESET });
    }
  }, [error, dispatch, alert, isUpdated, navigate]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        minHeight: "80vh",
        padding: "1rem",
        backgroundImage: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
      }}
    >
      <ChangePasswordWapper>
        <form>
          <h1>Change Password</h1>
          <div className="input-group">
            <input
              type="text"
              name="oldPassword"
              className="oldPassword"
              required
              autocomplete="off"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <label>Old Password</label>
          </div>
          <div className="input-group">
            <input
              type="text"
              name="newPassword"
              required
              autocomplete="off"
              className="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <label>New Password</label>
          </div>
          <div className="input-group">
            <input
              type="password"
              name="confirmPassword"
              required
              autocomplete="off"
              value={confirmPassword}
              className="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label>Confirm Password</label>
          </div>
          <button class="updateBtn" onClick={handleUpdatePassword}>
            Update
          </button>
        </form>
      </ChangePasswordWapper>
    </div>
  );
}

export default ChangePassword;
