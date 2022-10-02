import React from "react";
import styled from "styled-components";
import location from "../../../assets/icons/location.svg";
import mail from "../../../assets/icons/mail.svg";
import phone from "../../../assets/icons/phone.svg";
import twitter from "../../../assets/icons/twitter.svg";
import pinterest from "../../../assets/icons/pinterest.svg";
import facebook from "../../../assets/icons/facebook.svg";
import { tablet } from "../../../helper";

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  background-color: #ede5e5;
  box-sizing: border-box;
  padding: 2rem 0;
  ${tablet({ flexDirection: "column" })}
`;
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 34%;
  box-sizing: border-box;
  ${tablet({ width: "100%" })}
  h1 {
    font-family: "Urbanist";
  }
  p {
    font-size: 1.3rem;
  }
  .socials {
    img {
      margin: 5px 1rem;
      cursor: pointer;
    }
  }
`;
const UseFulLinksWrapper = styled.div`
  width: 40%;
  padding: 0.3rem;
  box-sizing: border-box;
  ${tablet({ width: "100%" })}
  h3 {
    font-family: "Urbanist";
  }

  p {
    font-size: 1.2rem;
    margin: 0.7rem 1rem;
  }
`;
const ContactWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  padding: 1rem;
  box-sizing: border-box;
  ${tablet({ width: "100%", overflow: "hidden" })}
  h4,
  h3 {
    display: inline-block;
    font-family: "Urbanist";
  }
  div {
    display: flex;
    justify-content: left;
    align-items: center;
    ${tablet({ width: "100%" })}
  }
  .cardsWrapper img {
    width: 100%;
    ${tablet({ width: "90%" })}
  }
`;

function Footer() {
  return (
    <Container>
      <InfoWrapper>
        <h1>Ecom.</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia vitae
          tempore aut quaerat? Quaerat, natus pariatur. Ex, voluptates, quis
          sapiente dolor, debitis voluptatem nam vel facere maxime ullam eaque
          sunt!
        </p>
        <div className="socials">
          <img src={twitter} alt="twitter icon" width="30px" height="30px" />
          <img src={facebook} alt="facebook icon" width="30px" height="30px" />
          <img
            src={pinterest}
            alt="pinterest icon"
            width="30px"
            height="30px"
          />
        </div>
      </InfoWrapper>
      <UseFulLinksWrapper>
        <h3>Useful Links</h3>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p>Home</p>
            <p>Womens Fashion</p>
            <p>accessories</p>
            <p>Order Tracking</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p>My Account</p>
            <p>Terms</p>
            <p>Wishlist</p>
            <p>Mens Fashion</p>
          </div>
        </div>
      </UseFulLinksWrapper>
      <ContactWrapper>
        <h3>Contact</h3>
        <div className="addressWrapper">
          <img src={location} alt="location icon" width="30px" height="30px" />
          <h4>D-H20 Delhi India</h4>
        </div>
        <div className="phoneWrapper">
          <img src={phone} alt="phone icon" width="30px" height="30px" />
          <h4>+91 293024802</h4>
        </div>
        <div className="mailWrapper">
          <img src={mail} alt="location icon" width="30px" height="30px" />
          <h4>abc@gmail.com</h4>
        </div>
        <div className="cardsWrapper">
          <img
            src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/payment-method_69e7ec.svg"
            alt="_"
            width="100px"
            height="42px"
          />
        </div>
      </ContactWrapper>
    </Container>
  );
}

export default Footer;
