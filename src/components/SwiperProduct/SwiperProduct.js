import React, { Component } from "react";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import ProductCard from "../Products/ProductCard";
import "./SwiperProduct.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { v4 as uuidv4 } from "uuid";
const SwiperProduct = (props) => {
  const { initIndex, lastIndex } = props;

  const dataAllProduct = useSelector((state) => state.product.product);
  let settings = {
    dots: false,
    infinite: true,
    infiniteLoop: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  return (
    <div className="slick">
      <Slider infiniteLoop={false} {...settings}>
        {dataAllProduct.map((product, index) => {
          if (index > initIndex - 1 && index < lastIndex) {
            return (
              <div key={uuidv4()}>
                {
                  // product.collection === "Mèo" &&
                  // <div className='horizon-item'>
                  <ProductCard key={index} product={product} />
                  // </div>
                }
              </div>
            );
          }
        })}
      </Slider>
    </div>
  );
};

export default SwiperProduct;
