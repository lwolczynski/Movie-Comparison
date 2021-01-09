/* eslint-disable react/prop-types */
import React, { useContext, useRef } from "react";
import { Image, Card } from "semantic-ui-react";
import Slider from "react-slick";
import carouselData from "./carouselData";
import PosterContext from "./PosterContext";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// eslint-disable-next-line react/display-name
const Poster = ({ item }) => {
  const { setPosterClicked } = useContext(PosterContext);
  return (
    <Card onClick={() => setPosterClicked({ ...item })}>
      <Image className="carousel-image" src={item.poster} />
    </Card>
  );
};

// eslint-disable-next-line react/display-name
const Carousel = React.memo(() => {
  const selected = useRef(
    carouselData.sort(() => 0.5 - Math.random()).slice(0, 15)
  );

  const settings = useRef({
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
  });

  const generateCards = () =>
    selected.current.map((item, index) => (
      <div className="carousel-div" key={index}>
        <Poster item={{ ...item }} />
      </div>
    ));

  return <Slider {...settings.current}>{generateCards()}</Slider>;
});

export default Carousel;
