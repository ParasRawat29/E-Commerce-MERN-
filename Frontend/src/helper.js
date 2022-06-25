import { css } from "styled-components";

export const tablet = (props) => {
  return css`
    @media only screen and (max-width: 600px) {
      ${props}
    }
  `;
};

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 400px) {
      ${props}
    }
  `;
};

export const CATEGORY = {
  home: "Home",
  all: "All",
  electronics: "Electronics",
  mensClothing: "Men's Clothing",
  womensClothing: "Women's Clothing",
  watches: "Watches",
  jewellery: "Jewellery",
  footwear: "Footwear",
};
export const getCategoryName = (category) => {
  return CATEGORY[category];
};
