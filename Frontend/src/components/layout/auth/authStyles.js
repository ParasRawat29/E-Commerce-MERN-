import styled from "styled-components";

export const AuthStyles = styled.div`
  overflow: hidden;
  user-select: none;
  .authWrapper {
    width: 100vw;
    height: 90vh;
    max-height: 1255px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    &::before {
      content: "Ecom.";
      font-family: "Urbanist";
      font-size: 30vw;
      position: absolute;
      top: 15%;
      transform: rotate(10deg);
      z-index: -1;
      opacity: 0.2;
      text-decoration: underline;
    }
    .authContainer {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 95%;
      height: 100%;

      max-height: 450px;
      background-color: white;
      min-width: 300px;
      max-width: 500px;
      box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.8);
      .toggleWrapper {
        width: 100%;
        min-height: 50px;
        text-align: center;

        button {
          width: 50%;
          height: 40px;
          font-size: 1.2rem;
          font-family: sans-serif;
          padding: 5px 10px;
          background-color: 6d7574;
          outline: none;
          border: none;
          cursor: pointer;
          margin-top: -3px;
        }
        .activeTab {
          font-weight: 900;
          height: 43px;
          color: #e2320b;
        }
        .activeLine {
          height: 3px;
          width: 50%;
          background-color: #e2320b;
          transition: all 0.3s ease-in-out;
        }
        .left {
          transform: translateX(0);
        }
        .right {
          transform: translateX(100%);
        }
      }
      .main {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
      }
      .socialLogin {
        display: flex;
        justify-content: center;
        background-color: #e2320b;
        width: 100%;
      }
    }
  }

  @media screen and (max-width: 800px) {
    .authWrapper::before {
      display: none;
    }
  }
`;
