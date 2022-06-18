import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
} from "../../../redux/actions/userAction";
import AdminSidebar from "../AdminSidebar";
import { useAlert } from "react-alert";
import UserInfo from "./UserInfo";
import actionTypes from "../../../redux/constats/actionTypes";

const Container = styled.div`
  min-height: 87vh;
  height: max-content;
  padding: 10px;
  position: relative;
  .mainContent {
    width: 100%;
    .usersWrapper {
      width: 80%;
      transition: all 0.3s ease-in-out;
      margin-left: ${(props) => (props.sidebarOpen ? "220px" : "100px")};
      table {
        overflow-x: scroll;
        font-family: "roboto";
        width: 100%;
        margin: auto;
        margin-top: 1rem;
        border: 1px solid lightgray;
        tr {
          border: 1px solid lightgray;
          th {
            border-left: 1px solid lightgray;
            border-bottom: 1px solid lightgray;
            text-align: left;
            padding: 10px 0 10px 10px;
            color: #938888;
            letter-spacing: 1px;
          }
          td {
            text-align: left;
            /* border: 1px solid lightgray; */
            padding: 10px 10px;
            span {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              /* border: 1px solid black; */
              .userPic {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin: 0 8px;
              }
              & > label {
                margin: 0 8px;
              }
            }
            .viewBtn,
            .deleteBtn {
              padding: 3px 7px;
              border: 2px solid orange;
              color: black;
              font-size: 0.8rem;
              background-color: inherit;
              text-decoration: none;
              border-radius: 4px;
              font-weight: 600;
              cursor: pointer;
              margin: 5px 10px;
              &:hover {
                background-color: orange;
                color: black;
              }
            }
            .deleteBtn {
              color: indianred;
              border: 2px solid indianred;
              &:hover {
                background-color: indianred;
                color: white;
              }
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 750px) {
    .mainContent {
      .usersWrapper {
        width: 100%;
        margin-left: ${(props) => (props.sidebarOpen ? "220px" : "5px")};
        table {
          width: 100%;
          tr {
            th {
              padding: 3px 5px;
            }
            td {
              padding: 10px 3px;
              font-size: 0.8rem;
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 400px) {
    .mainContent {
      .usersWrapper {
        table {
          width: 100%;
          tr {
            .emailCol {
              display: none;
            }
            td {
              font-size: 1rem;
              span {
                .userPic,
                label {
                  display: none;
                }
              }
            }
          }
        }
      }
    }
  }
`;

function AllUsers() {
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { allUsers, error } = useSelector((state) => state.allUsers);
  const { isDeleted, error: profileError } = useSelector(
    (state) => state.profile
  );
  const [userDetailOpen, setUserDetailOpen] = useState(false);
  const alert = useAlert();

  const handleUserDetailClick = (id) => {
    dispatch(getSingleUser(id));
    setUserDetailOpen(true);
  };

  const handleDeleteClick = (id) => {
    const ans = window.confirm("Delete User");
    if (ans) {
      dispatch(deleteUser(id));
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    if (profileError) {
      alert.error(profileError);
    }
    if (isDeleted) {
      alert.success("user successfully deleted");
      dispatch({ type: actionTypes.DELETE_USER_RESET });
    }
    dispatch(getAllUsers());
  }, [alert, dispatch, error, isDeleted, profileError]);

  return (
    <Container sidebarOpen={sidebarOpen}>
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        active="users"
      />
      <div className="mainContent">
        <button
          style={{
            width: "min-content",
            position: "absolute",
            top: "0",
            fontSize: "1.2rem",
            background: "inherit",
            cursor: "pointer",
            padding: "5px 3px 5px 10px",
            fontWeight: "600",
          }}
          onClick={() => setSidebarOpen((pre) => !pre)}
        >
          ☰
        </button>
        <div
          className="usersWrapper"
          style={{
            marginTop: "2rem",
          }}
        >
          {userDetailOpen ? (
            <UserInfo setUserDetailOpen={setUserDetailOpen} />
          ) : (
            <></>
          )}
          <h2
            style={{
              fontFamily: "roboto",
              fontWeight: "700",
              padding: "0 0 0 10px",
              color: "#606060",
            }}
          >
            Users
          </h2>
          <table>
            <tr>
              <th style={{ borderLeft: "none" }}>User</th>
              <th className="emailCol">Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
            {allUsers &&
              allUsers.map((user, idx) => {
                return (
                  <tr key={idx}>
                    <td>
                      <span style={{ fontWeight: "600" }}>
                        {user.avatar.image_url ? (
                          <img
                            className="userPic"
                            src={user.avatar.image_url}
                            alt="userPic"
                          />
                        ) : (
                          <label style={{ fontSize: "1.7rem" }}>🧑</label>
                        )}

                        {user.name}
                      </span>
                    </td>
                    <td className="emailCol">{user.email}</td>
                    <td>{user.role}</td>
                    <td style={{ width: "175px" }}>
                      <button
                        className="viewBtn"
                        onClick={() => handleUserDetailClick(user._id)}
                      >
                        View
                      </button>
                      <button
                        className="deleteBtn"
                        onClick={() => handleDeleteClick(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    </Container>
  );
}

export default AllUsers;
