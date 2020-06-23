import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./Jumbatron.css";

export default function Jumbatron() {
  return (
    <Carousel interval={5000} pauseOnHover={false}>
      <Carousel.Item>
        <img
          className="d-block w-100 jimage"
          src={require("../../../img/acc1.jpg")}
          alt="slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 jimage"
          src={require("../../../img/acc2.jpg")}
          alt="slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 jimage"
          src={require("../../../img/acc3.jpg")}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}
