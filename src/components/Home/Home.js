import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import SwiperBanner from "../SwiperBanner/SwiperBanner";
import SwiperProduct from "../SwiperProduct/SwiperProduct";
import "./Home.scss";

import Banner2 from "./Banner2";
import ListSearch from "./ListSearch";
import TimeCounter from "./TimeCounter";
import TopBuy from "./TopBuy";

export function randomFrom0To40() {
  return Math.floor(Math.random() * 41);
}

function Home(props) {
  const navigate = useNavigate();
  const stateSaleRandom = JSON.parse(localStorage?.getItem("stateSaleRandom"));
  const dateSaleOld = stateSaleRandom?.date;
  const [randomSale, setRandomSate] = useState(stateSaleRandom?.randomNumber);
  const dateToday = new Date().getDate();

  if (!randomSale || dateToday !== dateSaleOld) {
    const newRandomNumber = randomFrom0To40();
    setRandomSate(newRandomNumber);
    localStorage?.setItem(
      "stateSaleRandom",
      JSON.stringify({
        randomNumber: newRandomNumber,
        date: dateToday,
      })
    );
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="homePage">
      {/* Banner top */}
      <div className="homePage-slider  ">
        <SwiperBanner />
      </div>

      {/* Banner category */}
      <div>
        <Banner2 />
      </div>

      {/* Sale off */}
      <div className="homePage-list-product">
        <h5 className="header-slick container pt-2 d-flex">
          <div>
            <span
              className="spinner-grow text-warning spinner-grow-sm me-2"
              role="status"
            ></span>
            <span>KHUYẾN MÃI</span>
          </div>
          <div>
            <TimeCounter />
          </div>
        </h5>
        <div className="top-sale-off">
          <SwiperProduct initIndex={randomSale} lastIndex={randomSale + 10} />
        </div>

        <div
          className="btn btn-light mt-1"
          onClick={() => navigate("/collections/Mèo")}
        >
          Xem tất cả
          <MdOutlineKeyboardArrowRight className="icon-arrow-right" />
        </div>
      </div>

      {/* New product */}
      <div className="homePage-list-category">
        <div>
          <h4 className="text-left p-2 pt-5  " style={{ fontWeight: "800" }}>
            TOP SẢN PHẨM MỚI
          </h4>
        </div>
        <SwiperProduct initIndex={0} lastIndex={15} />
      </div>

      {/* Top search */}
      <div>
        <ListSearch />
      </div>

      {/* Top buy */}
      <div>
        <TopBuy />
      </div>
    </div>
  );
}

export default Home;
