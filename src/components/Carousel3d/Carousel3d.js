import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Carousel3d.scss";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
  SwiperCore,
} from "swiper";
import CategoryCard from "../Category/CategoryCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoryAction } from "../../redux/actions/productActions";
import { getAllCategory } from "../services/apiServices";
import { useNavigate } from "react-router-dom";
import Skeleton from "../SkeletonCard/Skeleton";
import { v4 as uuidv4 } from "uuid";

const Carousel3d = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataCategoryRedux = useSelector((state) => state.product.allCategory);
  const [dataCategory, setDataCategory] = useState(dataCategoryRedux);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDataCategory();
  }, []);

  const fetchDataCategory = async () => {
    if (dataCategoryRedux && dataCategoryRedux.length > 0) {
      try {
        setDataCategory(dataCategoryRedux);
        dispatch(getAllCategoryAction());
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const resApiCategory = await getAllCategory();
        setDataCategory(resApiCategory);

        dispatch(getAllCategoryAction());
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="container-carousel">
      {!isLoading && (
        <Swiper
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          className="swiper_container"
          autoplay={true}
        >
          {dataCategory.map((item) => {
            return (
              <SwiperSlide
                className="item-carousel"
                key={uuidv4()}
                onClick={() => {
                  navigate(`/category/${item.name}`);
                }}
              >
                <div
                  className="carousel-image"
                  onClick={() => {
                    navigate(`/category/${item.name}`);
                  }}
                >
                  <img src={item.image} alt="slide_image" />
                  <h4 className="name-category text-center pt-2">
                    {item.name}
                  </h4>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
      {isLoading && (
        <Swiper
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            clickable: true,
          }}
          className="swiper_container"
          autoplay={true}
        >
          <SwiperSlide>
            <div className="carousel-image">
              <Skeleton />
              <h4 className="name-category text-center"></h4>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="carousel-image">
              <Skeleton />
              <h4 className="name-category text-center"></h4>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="carousel-image">
              <Skeleton />
              <h4 className="name-category text-center"></h4>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="carousel-image">
              <Skeleton />
              <h4 className="name-category text-center"></h4>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="carousel-image">
              <Skeleton />
              <h4 className="name-category text-center"></h4>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="carousel-image">
              <Skeleton />
              <h4 className="name-category text-center"></h4>
            </div>
          </SwiperSlide>
        </Swiper>
      )}
    </div>
  );
};

export default Carousel3d;
