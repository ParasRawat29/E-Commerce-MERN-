import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import leftArrow from "../../../assets/icons/left-arrow.svg";
import rightArrow from "../../../assets/icons/right-arrow.svg";
import slider1 from "../../../assets/images/slider1.jpg";
import slider2 from "../../../assets/images/slider2.jpg";
import slider3 from "../../../assets/images/slider3.jpg";
import { mobile, tablet } from "../../../helper";

const SLIDER_DATA = [
  {
    slideno: "1",
    title: "Summer Sale",
    description: "get upto 80% off on all brands",
    backGroundColor: "#dddfde",
    color: "black",
    image: slider1,
  },
  {
    slideno: "2",
    title: "Jewellery",
    description: "all trusted and 100% original jewellery ",
    backGroundColor: "#160d08;",
    color: "white",
    image: slider2,
  },
  {
    slideno: "3",
    title: "Electronic Gadgets",
    description: "checkout latest electronic gadgets here",
    backGroundColor: "#c2a596",
    color: "black",
    image: slider3,
  },
];

const Container = styled.div`
  width: 100%;
  height: 40vw;
  max-height: 300px;
  background-color: lightcoral;
  position: relative;
  top: 0;
`;
const Arrow = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  top: 50%;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  transform: translateY(-50%);
  cursor: pointer;
  opacity: 0.4;
  &:hover {
    opacity: 1;
  }
  z-index: 1000;
  ${tablet(`width:30px;height:30px`)}
`;

const Wrapper = styled.div`
  height: 100%;
  /* width: 100vw; */
  display: flex;
  overflow: hidden;
`;

const Slide = styled.div`
  min-width: 100%;
  height: 100%;
  display: flex;

  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  color: ${(props) => props.color};
  background-color: ${(props) => props.backGroundColor};
  transform: ${(props) => `translateX(-${(props.activeSlideno - 1) * 100}%)`};
  transition: transform 0.7s;
`;
const ImageContainer = styled.div`
  max-width: 40%;
  height: 100%;
  img {
    height: 100%;
    width: 100%;
    aspect-ratio: 1;
  }
`;
const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 30px;
  height: 100%;
  background-color: inherit;

  .title {
    font-family: "Roboto";
    font-size: 4rem;
    font-weight: 900;
    ${tablet(`font-Size:2rem`)};
    ${mobile(`font-Size:1.3rem`)}
  }
  .description {
    font-family: sans-serif;
    font-size: 1.4rem;
    font-weight: 600;
    ${tablet(`font-Size:1rem`)};
    ${mobile(`font-Size:0.8rem`)}
  }
  .shopBtn {
    width: 150px;
    height: 50px;
    background-color: black;
    outline: none;
    color: white;
    font-size: 1.3rem;
    cursor: pointer;
    border: 2px solid white;
    ${tablet(`font-Size:1rem;width:120px;height:40px`)};
    ${mobile(`font-Size:0.7rem;width:100px;height:30px`)}
  }
`;

const Navigator = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* background-color: indianred; */
`;
const Dot = styled.div`
  width: ${(props) => (props.isActive ? "30px" : "15px")};
  height: 15px;
  margin: 0 0.3rem;
  background-color: ${(props) => (props.isActive ? "#e77474" : "#c3bebe")};
  border-radius: ${(props) => (props.isActive ? "700px" : "50%")};
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  ${tablet(`height:7px;width:${(props) => (props.isActive ? "10px" : "7px")}`)}
`;
function Slider() {
  const navigate = useNavigate();

  const [activeSlideno, setActiveSlideNo] = useState(1);

  const handleArrowClick = (direction) => {
    if (direction === "left") {
      if (activeSlideno === 1) {
        setActiveSlideNo(SLIDER_DATA.length);
      } else {
        setActiveSlideNo((pre) => pre - 1);
      }
    } else if (direction === "right") {
      if (activeSlideno === SLIDER_DATA.length) {
        setActiveSlideNo(0);
      }
      setActiveSlideNo((pre) => pre + 1);
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleArrowClick("left")}>
        <img
          className="arrow arrow-left"
          src={leftArrow}
          alt="leftArrow"
          width="50px"
          height="50px"
        />
      </Arrow>
      <Arrow direction="right" onClick={() => handleArrowClick("right")}>
        <img
          className="arrow arrow-right"
          src={rightArrow}
          alt="rightArrow"
          width="50px"
          height="50px"
        />
      </Arrow>
      <Wrapper>
        {SLIDER_DATA.map((slide) => {
          return (
            <Slide
              slideno={slide.slideno}
              backGroundColor={slide.backGroundColor}
              color={slide.color}
              activeSlideno={activeSlideno}
            >
              <ImageContainer>
                <img src={slide.image} alt="slidebanner" />
              </ImageContainer>
              <AboutContainer>
                <div className="title">{slide.title}</div>
                <div className="description">{slide.description}</div>
                <button
                  className="shopBtn"
                  onClick={() => navigate("/products")}
                >
                  Shop Here
                </button>
              </AboutContainer>
            </Slide>
          );
        })}
      </Wrapper>
      <Navigator>
        <div
          className="dots"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {SLIDER_DATA.map((slide, idx) => (
            <Dot
              isActive={idx + 1 === activeSlideno}
              onClick={() => setActiveSlideNo(idx + 1)}
            ></Dot>
          ))}
        </div>
      </Navigator>
    </Container>
  );
}

export default Slider;
