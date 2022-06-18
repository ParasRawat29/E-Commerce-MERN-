import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  clearErrors,
  loadUser,
  updateProfile,
} from "../../../redux/actions/userAction";
import MetaData from "../../MetaData";
import { CircularProgress } from "@mui/material";
import actionTypes from "../../../redux/constats/actionTypes";
// styles for this component
const ProfileWrapper = styled.fieldset`
  display: flex;
  flex-direction: row;
  width: 95%;
  max-width: 800px;
  padding: 1rem;
  border: 1px solid #dfdbd8;
  margin: 2rem auto;
  -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
  box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
  background-color: white;
  legend {
    font-size: 1.2rem;
    font-weight: 600;
    font-family: Arial, Helvetica, sans-serif;
  }
  .left {
    width: 30%;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 1rem;
    min-width: 300px;
    img {
      height: auto;
      aspect-ratio: 1;
      width: 100%;
      border-radius: 50%;
      max-width: 400px;
    }
    .editIcon {
      position: absolute;
      bottom: 0rem;
      right: 2rem;
      cursor: pointer;
      background-color: orange;
      padding: 5px;
      border: 2px solid #d7cfcf;
      font-size: 1.5rem;
      border-radius: 50%;
    }
  }

  .right {
    width: 70%;
    min-width: 290px;
    /* background-color: lightpink; */
    padding: 1rem;
    .inputGrp {
      input {
        margin: 1rem 0;
        font-size: 3rem;
        font-family: "roboto";
        border-bottom: 2px solid black;
      }
    }
    .emailinput {
      input {
        font-size: 1.2rem;
        margin: 1rem 0;
      }
    }
    input {
      width: 80%;
      outline: none;
    }
    .label {
      font-size: 1.2rem;
      font-weight: bold;
      color: #ab8e8e;
      font-family: sans-serif;
    }
    .date,
    .email {
      font-size: 1.2rem;
      margin: 1rem 0;
      font-family: "Roboto";
    }
    .username {
      font-size: 3rem;
      font-family: "roboto";
      margin: 1rem 0;
      padding: 3px 10px;
    }
  }

  .right .orderBtn,
  .left .updateProfileBtn,
  .left .cancelProfileBtn,
  .left .saveProfileBtn,
  .right .changePassBtn {
    font-size: 1.2rem;
    font-family: "roboto";
    font-weight: bold;
    padding: 10px 15px;
    width: 100%;
    max-width: 400px;
    background-color: #ffa501cc;
    text-decoration: none;
    color: black;
    text-align: center;
    display: block;
    margin: 1rem 0;
    border-radius: 700px;
    cursor: pointer;
    min-width: 250px;
    &:hover {
      background-color: #fd770d;
    }
  }

  .left .saveProfileBtn,
  .left .cancelProfileBtn {
    min-width: 100px;
    width: 100px;
    font-size: 1.1rem;
    padding: 5px 10px;
  }
  @media screen and (max-width: 630px) {
    flex-direction: column;
    align-items: center;
    .right {
      .inputGrp {
        input {
          width: 100%;
        }
      }
    }
  }
`;

function Profile() {
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const { error, isLoading, isUpdated } = useSelector((state) => state.profile);

  const [updated, setUpdate] = useState({ name: "", email: "" });
  const [updateActive, setUpdateActive] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const ele = e.target.name;
    const val = e.target.value;

    setUpdate((pre) => {
      return {
        ...pre,
        [ele]: val,
      };
    });
  };

  const updateAvatar = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const saveChanges = (e) => {
    if (avatar === avatarPreview) {
      dispatch(updateProfile(updated.name, updated.email, ""));
      setAvatarPreview("");
    } else {
      dispatch(updateProfile(updated.name, updated.email, avatarPreview));
    }
    setUpdateActive(false);
  };

  useEffect(() => {
    if (user) {
      setUpdate(() => {
        return {
          name: user.name,
          email: user.email,
        };
      });
      setAvatar(user.avatar.image_url);
      setAvatarPreview(avatar);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Profile Updated");
      dispatch(loadUser());
      dispatch({ type: actionTypes.UPDATE_PROFILE_RESET });
    }
  }, [user, updateActive, error, isUpdated]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        minHeight: "84vh",
        backgroundImage: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
      }}
    >
      <ProfileWrapper>
        <legend>Profile</legend>

        <MetaData title="Profile" />
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
            <CircularProgress color="secondary" size={80} />
          </div>
        ) : (
          <>
            {user ? (
              <>
                <>
                  <div className="left">
                    <div className="image" style={{ position: "relative" }}>
                      {updateActive ? (
                        <img src={avatarPreview} alt="" />
                      ) : (
                        <img src={avatar} alt="" />
                      )}

                      {updateActive ? (
                        <div>
                          <label htmlFor="avatarUpload">
                            <p className="editIcon">📷</p>
                            <input
                              type="file"
                              name="avatar"
                              accept="image/*"
                              id="avatarUpload"
                              style={{ display: "none" }}
                              onChange={updateAvatar}
                            />
                          </label>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    {updateActive ? (
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <button
                          className="saveProfileBtn"
                          style={{ backgroundColor: "#54d754" }}
                          onClick={() => saveChanges()}
                        >
                          Save
                        </button>
                        <button
                          className="cancelProfileBtn"
                          style={{ backgroundColor: "indianred" }}
                          onClick={() => setUpdateActive(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        className="updateProfileBtn"
                        onClick={() => setUpdateActive((pre) => !pre)}
                      >
                        Update Profile
                      </button>
                    )}
                  </div>
                  <div className="right">
                    {updateActive ? (
                      <div
                        style={{
                          display: "flex",
                          height: "80%",
                          flexDirection: "column",
                          justifyContent: "space-around",
                        }}
                      >
                        <div className="inputGrp nameinput">
                          <label className="label">Name : </label>
                          <input
                            name="name"
                            value={updated.name}
                            onChange={handleChange}
                            placeholder="name"
                          />
                        </div>
                        <div className="inputGrp emailinput">
                          <label className="label">Email : </label>
                          <input
                            name="email"
                            value={updated.email}
                            onChange={handleChange}
                            placeholder="email"
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <h1 className="username">{user.name}</h1>
                        <p className="email">
                          <span className="label">Email: </span>
                          {user.email}
                        </p>
                        <p className="date">
                          <span className="label">Joined On: </span>
                          {user.createdAt.substring(0, 10) || "fdjaldk"}
                        </p>
                        <Link to="/orders" className="orderBtn">
                          My Orders
                        </Link>
                        <button
                          className="changePassBtn"
                          onClick={() => navigate("/change/password")}
                        >
                          Change Password
                        </button>
                      </>
                    )}
                  </div>
                </>
              </>
            ) : (
              <h1></h1>
            )}
          </>
        )}
      </ProfileWrapper>
    </div>
  );
}

export default Profile;
