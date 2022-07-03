import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ImagesWrapper = styled.div`
  position: fixed;
  padding: 10px 5px;
  display: flex;
  flex-direction: row;
  width: 40%;
  height: 80%;
  padding: 0 15px;
  .otherImagesWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 10px;
    img {
      margin: 10px 0;
      cursor: pointer;
      padding: 3px;
    }
  }
  .imageWrapper {
    .CarouselImage {
      width: 100%;
      /* min-height: 320px; */
      max-height: 500px;
      height: 100%;
      object-fit: contain;
    }
  }

  @media screen and (max-width: 940px) {
    position: static;
    width: 100%;
  }
`;

function ProductImages({ product }) {
  //   console.log(product);
  const [mainImage, setMainImage] = useState();
  const [active, setActive] = useState(0);
  console.log(mainImage);

  const hangleImageSelect = (id, url) => {
    setMainImage(url);
    setActive(id);
  };

  useEffect(() => {
    if (product) setMainImage(product?.images[0]?.image_url);
  }, []);
  return (
    <ImagesWrapper>
      <div className="otherImagesWrapper">
        {product &&
          product.images.length &&
          product.images.map((image, id) => {
            return (
              <img
                onMouseOver={() => hangleImageSelect(id, image.image_url)}
                key={id}
                src={image.image_url}
                height="60"
                width="60"
                alt="otherimages"
                style={{
                  border: active === id ? "2px solid grey" : "none",
                }}
              />
            );
          })}
      </div>
      <div className="imageWrapper">
        <img src={mainImage} className="CarouselImage" alt={`slide`} />
      </div>
    </ImagesWrapper>
  );
}

export default ProductImages;
