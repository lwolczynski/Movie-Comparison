import React from "react";
import { Image, Card } from "semantic-ui-react";
import Slider from "react-slick";
import carouselData from "./carouselData";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const generateCards = () => {
  const shuffled = carouselData.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 15);
  return selected.map((item, index) => (
    <div className="carousel-div" key={index}>
      <Card onClick={() => console.log("!")}>
        <Image className="carousel-image" src={item.poster} />
      </Card>
    </div>
  ));
};
const settings = {
  infinite: true,
  centerMode: true,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  variableWidth: true,
  autoplaySpeed: 3000,
  cssEase: "linear",
};

const Carousel = () => <Slider {...settings}>{generateCards()}</Slider>;

export default Carousel;
