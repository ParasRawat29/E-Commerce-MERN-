import styled from "styled-components";

export const LeftsidebarStyles = styled.div`
  .leftSidebarWrapper {
    position: fixed;
    height: 100vh;
    max-width: 240px;
    background-color: white;
    z-index: 1000;
    transition: all 0.5s ease-in-out;
    overflow-y: auto;
    .categoryWrapper {
      ul {
        list-style-type: none;
        padding: 10px;
      }

      li {
        min-width: 100px;
        width: 200px;
        padding: 4px;
        margin: 1rem 5px;
        border-radius: 10px;
        cursor: pointer;
        border: 2px solid white;
        &:hover {
          border: 2px solid #ddd8d8;
          cursor: pointer;
        }
      }
      .activeCategory {
        background-color: #efeeed;
        font-weight: 700;
      }
      button {
        outline: none;
        border: none;
        font-size: 1.1rem;
        cursor: pointer;
        font-weight: inherit;
        background-color: inherit;
        span {
          font-weight: normal;
        }
        p {
          font-weight: inherit;
          display: inline;
        }
      }
    }
    .filterWrapper {
      padding-left: 10px;
      border-top: 1px solid gray;
      border-bottom: 1px solid gray;
      & > h4 {
        font-size: 1.3rem;
        text-decoration: underline;
        font-weight: 700;
        font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
      }
      .subHead {
        font-size: 1.1rem;
        color: black;
        font-family: "roboto";
      }
    }
  }
  @media screen and (max-width: 900px) {
    .leftSidebarWrapper {
      transform: translateX(-100%);
    }
  }
`;
