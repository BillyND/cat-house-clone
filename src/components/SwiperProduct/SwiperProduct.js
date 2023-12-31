import React from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ProductCard from "../Products/ProductCard";
import "./SwiperProduct.scss";
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
              <div key={product?.id + "-" + index}>
                {<ProductCard key={index} product={product} />}
              </div>
            );
          }
        })}
      </Slider>
    </div>
  );
};

export default SwiperProduct;
