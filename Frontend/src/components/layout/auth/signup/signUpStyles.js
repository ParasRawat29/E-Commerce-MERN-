import styled from "styled-components";

export const SignUpStyles = styled.div`
  user-select: none;
  width: 90%;
  height: 100%;
  .signup-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    margin: auto;
    min-width: 200px;
    color: black;
    border-radius: 10px;
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      width: 100%;

      height: 100%;
      .form-group {
        position: relative;
        width: 70%;
        margin: 30px;
        max-width: 400px;
        label {
          position: absolute;
          bottom: 3px;
          font-size: 1.1rem;
          font-family: sans-serif;
          letter-spacing: 2px;
          color: #7591b7;
        }
        input {
          width: 100%;
          display: block;
          border: none;
          outline: none;
          font-size: 1.2rem;
          border-bottom: 2px solid gray;
          background: inherit;
          padding: 5px;
          color: black;
        }
      }
      .form-group input:focus,
      .form-group input:valid {
        background: inherit;
        border-bottom-color: #e2320b;
      }
      .form-group label span {
        display: inline-block;
        transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }
      .form-group input:focus + label span,
      .form-group input:valid + label span {
        transform: translateY(-40px);
        color: #e2320b;
      }

      .submitBtn {
        font-size: 1.1rem;
        width: 100%;
        max-width: 270px;
        padding: 10px 10px;
        cursor: pointer;
        background: inherit;
        outline: none;
        background-color: #fd7306;
        border-radius: 700px;
        font-weight: 900;
        /* &:hover {
          background-color: #;
        } */
        &:active {
          transform: scale(0.98);
        }
      }

      a {
        color: lightblue;
      }
    }
  }
`;
