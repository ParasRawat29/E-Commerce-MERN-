import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: teal;
  height: 25px;
  color: white;
  font-family: sans-serif;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Urbanist";
  font-weight: lighter;
`;

function Announcement() {
  return <Container>Flat ₹1000 off on orders above ₹4000</Container>;
}

export default Announcement;
