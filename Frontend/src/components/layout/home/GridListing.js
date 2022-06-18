import React from "react";
import styled from "styled-components";
import casualWear from "../../../assets/images/casualWear.webp";
import jacket from "../../../assets/images/jacket.webp";
import sneakers from "../../../assets/images/sneakers.webp";
import watch from "../../../assets/images/watch.webp";
import femaleDress from "../../../assets/images/femaleDress.webp";
import femaleTrouser from "../../../assets/images/femaleTrouser.webp";
import { Link } from "react-router-dom";
import { mobile, tablet } from "../../../helper";
const GridContainer = styled.a`
  box-sizing: border-box;
  display: grid;
  width: 100%;
  min-height: 500px;
  grid-template-columns: auto auto auto auto;
  grid-gap: 1rem;
  padding: 1rem;
  margin-top: 2rem;
  color: "black";
  text-decoration: none;

  .item {
    background-color: gray;
    font-family: "Urbanist";
    border-radius: 10px;
    overflow: hidden;
    min-height: 150px;
    text-decoration: none;
    color: black;
    padding: 4px;
  }
  .item1,
  .item4 {
    grid-row-start: 0;
    grid-column-start: 0;
    grid-column-end: span 2;
    ${mobile(`grid-column-end: span 2;min-height:90px;height:100px`)}
  }
  .item2,
  .item3,
  .item5,
  .item6 {
    /* background-color: indianred; */
    grid-row-end: span 2;
  }

  .item7,
  .item8 {
    grid-column-start: 3;
    grid-column-end: span 2;
  }
  .item1,
  .item8 {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: lightblue;
    font-weight: 900;
    font-size: 1.3rem;
  }
  .item2,
  .item3,
  .item5,
  .item6 {
    max-width: 300px;
    position: relative;
    background-image: url(${casualWear});
    background-position: top;
    background-size: cover;
    background-repeat: no-repeat;

    h3 {
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: center;
      left: 50%;
      /* background-color: antiquewhite; */
      font-size: 1.5rem;
      color: white;
      transform: translate(-50%);
    }
  }
  .item3 {
    background-image: url(${sneakers});
    background-size: cover;
    background-position: left;
    h3 {
      color: black;
    }
  }
  .item4,
  .item7 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #e9d8c0;
    h2 {
      text-align: center;
      color: black;
      width: 70%;
    }
  }
  .item5 {
    border: 2px solid black;
    background-image: url(${watch});
    background-position: right;
    h3 {
      color: orange;
      bottom: 1rem;
    }
  }
  .item6 {
    background-image: url(${femaleDress});
    background-position: top;
    h3 {
      color: white;
    }
  }
  .item7 {
    background-color: #e0e2e6;
    max-height: 170px;
  }
  .item8 {
    background-color: #f187b5;
  }

  /* making grid responsive according to screen size */
  .item1,
  .item4 {
    ${tablet(`font-Size:1rem`)}
    img {
      ${tablet(`width:90px;height:100px`)}
    }
    h2 {
      ${tablet(`font-Size:1rem`)}
    }
  }

  .item2 {
    ${tablet(`grid-column:3 / span 2 ; `)}
    h3 {
      ${tablet(`font-Size:1rem`)}
    }
  }
  .item3 {
    ${tablet(`grid-row:2 /span 1 ;grid-column:1 / span 2 ;`)}
  }
  .item4 {
    ${tablet(`grid-row:3 /span 1 ;grid-column:1 / span 4 ;`)}
  }
  .item5 {
    ${tablet(`grid-row:4 /span 1 ;grid-column:1 / span 2 ;`)}
  }
  .item6 {
    ${tablet(`grid-row:4 /span 1 ;grid-column:3 / span 2 ;`)}
  }
  .item7 {
    ${tablet(`grid-row:5 /span 1 ;grid-column:1 / span 4 ;`)}
  }
  .item8 {
    ${tablet(`grid-row:6 /span 1 ;grid-column:1 / span 4 ; height:80px`)}
  }
`;

function GridListing() {
  return (
    <GridContainer>
      <Link to="/products" className="item item1">
        Get Upto 80% OFF
      </Link>
      <Link to="/products" className="item item2">
        <h3>Casual Wear</h3>
      </Link>
      <Link to="/products" className="item item3">
        <h3>Sneakers</h3>
      </Link>
      <Link to="/products" className="item item4">
        <h2>Winter Essentails @ 50% Off</h2>
        <img src={jacket} alt="" width="170px" height="200px" />
      </Link>
      <Link to="/products" className="item item5">
        <h3>Watches</h3>
      </Link>
      <Link to="/products" className="item item6">
        <h3>Dresses</h3>
      </Link>
      <Link to="/products" className="item item7">
        <h2>Women Trackpants</h2>
        <img
          src={femaleTrouser}
          width="170px"
          height="200px"
          alt="women trackpants"
        />
      </Link>
      <Link to="/products" className="item item8">
        New Season Textures
      </Link>
    </GridContainer>
  );
}

export default GridListing;
