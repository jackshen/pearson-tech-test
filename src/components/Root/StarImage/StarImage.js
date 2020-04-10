import React from "react";
import styled from "styled-components";

import starImage from "#root/assets/star-small.png";

const ImageTag = styled.img`
  background: white;
  height: 20rem;
  mix-blend-mode: luminosity;
  width: 20rem;
`;

const ImageWrapper = styled.div`
  align-items: center;
  background: ${({ velocity }) => {
    if (velocity < 0) return `rgba(0, 0, 255, ${Math.abs(velocity) / 100})`;
    return `rgba(255, 0, 0, ${Math.abs(velocity) / 100})`;
  }};
  display: flex;
  justify-content: center;
  transition: background 0.25s;
`;

const StarImage = ({ range, velocity }) => {
  return (
    <ImageWrapper range={range} velocity={velocity}>
      <ImageTag alt="Small star" src={starImage} />
    </ImageWrapper>
  );
};

export default StarImage;
