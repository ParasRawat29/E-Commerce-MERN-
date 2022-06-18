import styled from "styled-components";
import { tablet } from "../../../helper";

export const HeaderStyles = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 21000000;
  border-bottom: 1px solid lightgray;
  button {
    outline: none;
    border: none;
  }
  nav {
    background-color: white;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    ${tablet({ padding: "2px 0" })}

    .logoWrapper {
      display: flex;
      flex-direction: row;
      /* justify-content: center; */
      align-items: center;

      .logo {
        font-size: 2rem;
        color: black;
        text-decoration: none;
        margin-left: 5px;
        font-family: "Urbanist", sans-serif;
        ${tablet({ display: "none" })}
      }

      .toggleBtn {
        display: inline;
        height: 30px;
        margin: 0 3px 0 5px;
        cursor: pointer;
        font-size: 1.3rem;
        background-color: transparent;
      }
    }
    .searchBar {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30%;
      height: 30px;
      min-width: 270px;
      border: 1px solid gray;
      border-radius: 5px;
      ${tablet({ width: "70%", marginLeft: "2%", minWidth: "200px" })}
      input {
        height: 20px;

        min-width: 130px;
        width: 90%;
        font-size: 1rem;
        max-width: 400px;
        border: none;
        outline: none;
        padding: 0 0 0 15px;
      }
      i {
        margin-top: 2px;
        margin-right: 10px;
      }
    }
    .cartWrapper {
      /* margin-right: 1.3rem; */
      position: relative;
      /* width: 100px; */
      width: 120px;
      .cartBtn {
        height: 100%;
        background-color: inherit;
        padding: 4px;
        /* margin-right: 1rem; */
        .cart {
          position: relative;
          width: 50px;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          /* background-color: orange; */
          .cartIcon {
            /* background: coral; */
            width: 40px;
            height: 40px;
          }
          .num {
            font-size: 1rem;
            position: absolute;
            top: 0px;
            right: 5px;
            aspect-ratio: 1;
            width: 20px;
            border-radius: 50%;
            color: white;
            font-weight: 600;
            background: indianred;
            text-align: center;
            z-index: 0;
          }
        }
      }
      .userIcon {
        .speedD {
          position: absolute;
          top: 8px;
          right: 10px;
          & > button {
            background-color: gray;
            & > img {
              border-radius: 50%;
            }
          }
        }
        button {
          width: 40px;
          height: 40px;
          font-size: 1.5rem;
        }
      }
    }
    .loginBtn {
      padding: 8px 10px;
      background-color: #f1b757;
      font-size: 1rem;
      border-radius: 5px;
      font-weight: 600;
      text-align: center;
      cursor: pointer;
    }
    @media screen and (max-width: 600px) {
      .loginBtn {
        padding: 5px 5px;
        font-size: 1rem;
      }
      .cartWrapper {
        margin-right: 0px;
        width: 80px;
        .cartBtn {
          margin-right: 20px;
          .cart {
            width: 30px;
            height: 30px;
            .cartIcon {
              width: 30px;
              height: 30px;
            }
            .num {
              font-size: 0.8rem;
              width: 13px;
            }
          }
        }
        .userIcon {
          .speedD {
            position: absolute;
            top: -2px;
            right: 0px;
            & > button {
              width: 30px;
              height: 30px;
              & > img {
                width: 30px;
                height: 30px;
              }
            }
          }
          button {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            outline: none;
            border: none;
            top: 5px;
          }
        }
      }
    }
  }
`;
