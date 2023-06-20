import ListProducts from "../Products/ListProducts";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Home.scss";
import { useNavigate } from "react-router-dom";
import { fetchAllProductsRedux } from "../../redux/actions/productActions";
import SwiperBanner from "../SwiperBanner/SwiperBanner";
import SwiperProduct from "../SwiperProduct/SwiperProduct";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

import Banner2 from "./Banner2";
import ListSearch from "./ListSearch";
import TopBuy from "./TopBuy";
function Home(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [timeFlashSale, setTimeFlashSale] = useState(0);
  const [displayTimeFlashSale, setdisplayTimeFlashSale] = useState(
    "00 giờ 00 phút 00 giây"
  );
  const newDate = new Date();

  const countTimeFlashSale = () => {
    let timeCurrent =
      newDate.getHours() * 60 * 60 +
      newDate.getMinutes() * 60 +
      newDate.getSeconds();
    let timeOneDay = 86400;

    setTimeFlashSale(timeOneDay - timeCurrent);
  };

  useEffect(() => {
    let timeCountDown = setTimeout(() => {
      if (timeFlashSale < 1) {
        clearTimeout(timeCountDown);
      } else {
        setTimeFlashSale((prev) => prev - 1);
      }
    }, 1000);
    const h = Math.floor(timeFlashSale / 3600)
        .toString()
        .padStart(2, "0"),
      m = Math.floor((timeFlashSale % 3600) / 60)
        .toString()
        .padStart(2, "0"),
      s = Math.floor(timeFlashSale % 60)
        .toString()
        .padStart(2, "0");

    setdisplayTimeFlashSale(h + " giờ " + m + " phút " + s + " giây");
    return () => {
      clearTimeout(timeCountDown);
    };
  }, [timeFlashSale]);

  useEffect(() => {
    countTimeFlashSale();
    window.scrollTo(0, 0);
    // dispatch(fetchAllProductsRedux())
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
            <span className="ms-3" style={{ color: "yellow" }}>
              {displayTimeFlashSale}
            </span>
          </div>
        </h5>
        <div className="top-sale-off">
          <SwiperProduct initIndex={20} lastIndex={40} />
          {/* <ListProducts
                        limitProduct={10}
                        collections="Mèo"
                    /> */}
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
        <SwiperProduct initIndex={0} lastIndex={21} />
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
