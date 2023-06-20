import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";
import "./SwiperBanner.scss";
export default function SwiperBanner() {
  const navigate = useNavigate();
  return (
    <div>
      <Carousel
        autoPlay
        showArrows={true}
        infiniteLoop={true}
        preventMovementUntilSwipeScrollTolerance={true}
        emulateTouch={true}
        className="full-carousel"
      >
        <div
          className="full-screen-slider"
          onClick={() => navigate("/collections/all")}
        >
          <img
            alt=""
            src="https://theme.hstatic.net/200000108863/1000985860/14/slide_1_img.jpg?v=3"
          />
        </div>
        <div
          className="full-screen-slider"
          onClick={() => navigate("/collections/all")}
        >
          <img
            alt=""
            src="https://theme.hstatic.net/200000108863/1000985860/14/slide_2_img.jpg?v=3"
          />
        </div>
        <div
          className="full-screen-slider"
          onClick={() => navigate("/collections/all")}
        >
          <img
            alt=""
            src="https://theme.hstatic.net/200000108863/1000985860/14/slide_3_img.jpg?v=3"
          />
        </div>
      </Carousel>
      <Carousel
        autoPlay
        showArrows={true}
        infiniteLoop={true}
        preventMovementUntilSwipeScrollTolerance={true}
        emulateTouch={true}
        className="mini-carousel"
      >
        <div
          className="mini-screen-slider"
          onClick={() => navigate("/collections/all")}
        >
          <img
            alt=""
            src="https://theme.hstatic.net/200000108863/1000985860/14/slide_1_mb.jpg?v=3"
          />
        </div>
        <div
          className="mini-screen-slider"
          onClick={() => navigate("/collections/all")}
        >
          <img
            alt=""
            src="https://theme.hstatic.net/200000108863/1000985860/14/slide_2_mb.jpg?v=3"
          />
        </div>
        <div
          className="mini-screen-slider"
          onClick={() => navigate("/collections/all")}
        >
          <img
            alt=""
            src="https://theme.hstatic.net/200000108863/1000985860/14/slide_3_mb.jpg?v=3"
          />
        </div>
      </Carousel>
    </div>
  );
}
