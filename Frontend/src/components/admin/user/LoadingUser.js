import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 2rem auto;
  height: 150px;
  display: flex;
  padding: 7px;
  flex-direction: row;
  justify-content: space-between;
  -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
  box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);

  .left {
    width: 30%;
    .userPic {
      width: 80px;
      border-radius: 50%;
      background-color: gray;
      aspect-ratio: 1;
      margin: auto;
      margin-top: 1rem;
      animation: skeleton 1s ease infinite alternate;
    }
  }
  .right {
    width: 60%;
    display: flex;
    flex-direction: column;
    padding: 5px;
    .name,
    .email,
    .role,
    .joined {
      background-color: gray;
      width: 90%;
      height: 20px;
      margin: 7px 0;
      animation: skeleton 1s ease infinite alternate;
    }
    .email {
      width: 70%;
      height: 15px;
      animation: skeleton 0.5s ease infinite alternate;
    }
    .role,
    .joined {
      width: 40%;
      height: 15px;
      animation: skeleton 1.3s ease infinite alternate;
    }
  }

  @keyframes skeleton {
    to {
      opacity: 0.5;
    }
  }
`;

function LoadingUser({ setUserDetailOpen }) {
  return (
    <Container>
      <div className="left">
        <div className="userPic"></div>
      </div>
      <div className="right">
        <div className="name"></div>
        <div className="email"></div>
        <div className="role"></div>
        <div className="joined"></div>
      </div>
    </Container>
  );
}

export default LoadingUser;
