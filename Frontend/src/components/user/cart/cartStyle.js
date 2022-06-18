import styled from "styled-components";
export const CartWrapper = styled.div`
  padding: 10px;
  width: 100%;
  min-height: 80vh;
  font-family: "Readex Pro", sans-serif;
  box-sizing: border-box;
  background: "#fcfcfc";
  & > h4 {
    font-size: 1.2rem;
    margin: 10px 0;
  }
  .amount {
    font-weight: 600;
    color: #121212;
    font-family: "roboto";
    label {
      font-size: 1rem;
      font-weight: normal;
    }
  }
  button {
    outline: none;
    border: none;
    font-weight: 800;
  }
  .ProductsWrapper {
    display: flex;
    flex-direction: column;
    /* background-color: aquamarine; */
    width: 90%;
    max-width: 1000px;
    margin: auto;
    .productCard {
      display: flex;
      flex-direction: row;
      margin: 0;
      border-radius: 0;
      flex-grow: 1;
      padding: 10px;
      margin: 5px 0;
      height: fit-content;
      /* background-color: aqua; */
      max-height: 175px;
      -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
      box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
      img {
        width: 30%;
        height: auto;
        max-width: 300px;
        min-width: 150px;
        object-fit: "contain";
      }
      .card {
        display: flex;
        flex-direction: row;
        width: 90%;
        align-items: center;
        border: none;
        .productDes {
          /* background-color: aliceblue; */
          padding: 5px;
          width: 40%;
          min-width: 80px;
          .cardTitle {
            /* background-color: aqua; */
            font-size: 1.5rem;
            text-align: center;
            margin: 10px 0 20px 0;
          }
          .productPrice {
            margin: 10px 0;
            text-align: center;
            font-size: 1.3rem;
            color: gray;
          }
        }

        .quantityContainer {
          /* background-color: coral; */
          padding: 3px;
          display: flex;
          align-self: center;
          width: 40%;
          justify-content: center;
          align-items: center;
          min-width: 100px;
          .quantity {
            font-family: "roboto";
            font-weight: 600;
          }
          button {
            text-align: center;
            padding: 0;
            min-width: 40px;
            aspect-ratio: 1;
            font-size: 1.4rem;
            margin: 0 8px;
            border-radius: 50%;
            background-color: rgba(0, 0, 0, 0.2);
            cursor: pointer;
            &:active {
              transform: scale(0.9);
            }
          }
        }
        .removeBtn {
          color: indianred;
          border: 2px solid indianred;
          min-width: 90px;
          margin-left: 1rem;
          background-color: inherit;
          height: 40px;
          font-weight: 600;
          border-radius: 700px;
          cursor: pointer;
          &:hover {
            background-color: indianred;
            color: white;
          }
          &:active {
            transform: scale(0.9);
          }
        }
      }
    }
  }
  .totalAmtWrapper {
    display: flex;
    width: 80%;
    flex-direction: column;
    /* background-color: aqua; */

    margin: auto;
    margin-top: 1rem;
    .totalAmtContainer {
      /* background-color: pink; */
      border-top: 2px solid gray;
      width: 60%;
      max-width: 400px;
      margin-left: auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .totalDes {
      display: flex;
      width: 100;
      justify-content: center;
      align-items: center;
      min-width: 200px;
      .totalItem {
        margin: 0 40px;
        font-size: 1.1rem;
      }
      .amount {
        font-size: 1.4rem;
      }
    }
    .checkoutWrapper {
      margin-left: auto;
      margin-right: 3rem;
      font-size: 1.2rem;
      width: 100%;
      button {
        width: 100%;
        font-weight: 500;
        padding: 10px 30px;
        background-color: orange;
        cursor: pointer;
        &:active {
          transform: scale(0.97);
        }
      }
    }
  }
  @media screen and (max-width: 740px) {
    .ProductsWrapper {
      width: 100%;

      .productCard {
        height: fit-content;
      }
    }
  }
  @media screen and (max-width: 680px) {
    .ProductsWrapper {
      flex-direction: column;
      .productCard {
        max-height: 185px;
        img {
          width: 50%;
          min-width: 125px;
        }
        .card {
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .productDes,
          .quantityContainer,
          .removeBtn {
            width: 90%;
            text-align: center;
            padding: 5px 0;
          }
        }
      }
    }
    .totalAmtWrapper {
      width: 100%;
      margin: 1rem 0 2rem 0;
      .totalAmtContainer {
        width: 100%;
      }
    }
  }
`;
