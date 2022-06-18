import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import LoadingUser from "./LoadingUser";
import actionTypes from "../../../redux/constats/actionTypes";
import {
  ChangeUserRole,
  clearErrors,
  getAllUsers,
  getSingleUser,
} from "../../../redux/actions/userAction";

const Container = styled.div`
  width: 100%;
  max-width: 440px;
  margin: 2rem auto;
  /* background-color: lightcoral; */

  display: flex;
  padding: 7px;
  flex-direction: row;
  justify-content: space-between;
  -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
  box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
  .left {
    width: 30%;
    label {
      font-size: 3rem;
      border: 1px solid lightgray;
      border-radius: 50%;
      padding: 5px;
    }
    img {
      width: 100%;
      min-width: 80px;
      height: auto;
      border-radius: 50%;
      object-fit: cover;
      aspect-ratio: 1;
    }
  }
  .right {
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: left;
    font-family: "roboto";
    position: relative;
    padding: 5px;
    .closeBtn {
      position: absolute;
      right: 5px;
      top: 0px;
      padding: 0;
      width: 30px;
      aspect-ratio: 1;
      cursor: pointer;
      background-color: inherit;
      color: indianred;
      border: 1px solid indianred;
      border-radius: 50%;
    }
    h3 {
      margin: 7px 0px;
      font-size: 1rem;
      word-wrap: break-word;
      font-weight: normal;
      label {
        font-weight: 600;
        margin: 0 5px;
      }
    }
    .changeRoleBtn {
      padding: 5px 0;
      font-size: 1rem;
      width: 90%;
      background-color: inherit;
      border-radius: 700px;
      border: 2px solid purple;
      color: purple;
      cursor: pointer;
      margin-top: 0.8rem;
      &:hover {
        background-color: purple;
        color: white;
      }
      &:active {
        transform: scale(0.95);
      }
    }
  }

  @media screen and (max-width: 400px) {
    justify-content: center;
    padding: 4px;
    .right {
      .name {
        font-size: 1.4rem;
      }
      h3 {
        font-size: 0.8rem;
      }
    }
  }
`;

function UserInfo({ setUserDetailOpen }) {
  const { user, error, isLoading } = useSelector((state) => state.userDetails);
  const {
    isLoading: profileLoading,
    error: profileError,
    isUpdated,
  } = useSelector((state) => state.profile);
  const alert = useAlert();
  const dispatch = useDispatch();

  // change role of the user
  const handleRoleChange = (id, role) => {
    dispatch(
      ChangeUserRole(id, {
        name: user.name,
        email: user.email,
        role,
      })
    );
    dispatch(getAllUsers());
    dispatch(getSingleUser(user._id));
  };

  const changeTo = user && user.role === "admin" ? "user" : "admin";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (profileError) {
      alert.error(profileError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success(`User Profile Update to ${changeTo}`);
      dispatch({ type: actionTypes.UPDATE_USER_ROLE_RESET });
      dispatch(getAllUsers());
    }
  }, [alert, error, isUpdated, dispatch, changeTo, profileError]);

  return (
    <>
      {isLoading || profileLoading ? (
        <LoadingUser />
      ) : (
        <Container>
          {user ? (
            <>
              <div className="left">
                {user.avatar.image_url ? (
                  <img
                    className="userPic"
                    src={user.avatar.image_url}
                    alt="userPic"
                  />
                ) : (
                  <label className="userPic">🧑</label>
                )}
              </div>
              <div className="right">
                <button
                  className="closeBtn"
                  onClick={() => setUserDetailOpen(false)}
                >
                  <CloseOutlinedIcon />
                </button>
                <h1 className="name"> {user.name}</h1>
                <h3 className="email">
                  <label>email:</label>
                  {user.email}
                </h3>
                <h3 className="role">
                  <label>Role:</label>
                  {user.role === "admin" ? "Admin" : "User"}
                </h3>
                <h3 className="joined">
                  <label>Joined:</label>
                  {user.createdAt.substring(0, 10)}
                </h3>
                <button
                  className="changeRoleBtn"
                  onClick={() => handleRoleChange(user._id, changeTo)}
                >
                  {user.role === "admin"
                    ? "Change Role to User"
                    : "Change Role to Admin"}
                </button>
              </div>
            </>
          ) : (
            <></>
          )}
        </Container>
      )}
    </>
  );
}

export default UserInfo;
