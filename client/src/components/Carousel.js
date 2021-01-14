import React, { useContext } from "react";
import styled from "styled-components";
import { Image, Card } from "semantic-ui-react";
import Slider from "react-slick";
import carouselData from "./carouselData";
import PosterContext from "./PosterContext";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const StyledSlider = styled(Slider)`
  .slick-track {
    display: flex;
  }
`;

const Poster = ({ item }) => {
  const { setPosterClicked } = useContext(PosterContext);
  return (
    <Card onClick={() => setPosterClicked({ ...item })}>
      <Image className="carousel-image" src={item.poster} />
    </Card>
  );
};

const selected = carouselData.sort(() => 0.5 - Math.random()).slice(0, 15);

const settings = {
  infinite: true,
  centerMode: true,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  variableWidth: true,
  autoplaySpeed: 3000,
  nextArrow: <></>,
  prevArrow: <></>,
  cssEase: "linear",
};

const Carousel = () => {
  const generateCards = () =>
    selected.map((item, index) => (
      <div className="carousel-div" key={index}>
        <Poster item={{ ...item }} />
      </div>
    ));

  return <StyledSlider {...settings}>{generateCards()}</StyledSlider>;
};

export default Carousel;
