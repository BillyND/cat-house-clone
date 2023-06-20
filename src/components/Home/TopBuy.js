import React, { useState } from "react";
import ListProduct from "../Products/ListProducts";
import { useRef } from "react";
import useDraggableScroll from "use-draggable-scroll";
import { useNavigate } from "react-router-dom";

function TopBuy(props) {
  const ref = useRef(null);

  const { onMouseDown } = useDraggableScroll(ref);
  const [topBuyClicked, setTopBuyClicked] = useState(1);
  const [collections, setCollections] = useState("Mèo");
  const [infoButton, setInfoButton] = useState("Mèo có SẴN");
  const navigate = useNavigate();

  return (
    <div className="mt-5 ">
      <div className="header-top-buy container">
        <h5>TOP SẢN PHẨM BÁN CHẠY</h5>
        <div className="filter-top-buy" ref={ref} onMouseDown={onMouseDown}>
          <span
            className={`item-filter ${topBuyClicked === 1 ? "active" : ""}`}
            onClick={() => {
              setTopBuyClicked(1);
              setCollections("Mèo");
              setInfoButton("Mèo có SẴN");
            }}
          >
            Mèo có SẴN
          </span>
          <span
            className={`item-filter ${topBuyClicked === 2 ? "active" : ""}`}
            onClick={() => {
              setTopBuyClicked(2);
              setCollections("Phụ kiện");
              setInfoButton("SHOP FOR PET");
            }}
          >
            SHOP FOR PET
          </span>
          <span
            className={`item-filter ${topBuyClicked === 3 ? "active" : ""}`}
            onClick={() => {
              setTopBuyClicked(3);
              setCollections("Dịch vụ Grooming&Spa thú cưng Website");
              setInfoButton("GROOMING&SPA");
            }}
          >
            GROOMING&SPA
          </span>
          <span
            className={`item-filter ${topBuyClicked === 4 ? "active" : ""}`}
            onClick={() => {
              setTopBuyClicked(4);
              setCollections("Hotel website");
              setInfoButton("HOTEL");
            }}
          >
            HOTEL
          </span>
        </div>
      </div>
      <div className="content-top-buy mt-3">
        <div className="banner-top-buy">
          <img src="https://theme.hstatic.net/200000108863/1000985860/14/home_coll_1_banner.jpg?v=3" />
        </div>
        <div className="list-item-top-buy">
          <ListProduct limitProduct={10} collections={collections} />
        </div>
      </div>

      <div
        className="button-footer-top-buy"
        onClick={() => navigate(`/collections/${collections}`)}
      >
        <span>
          <span className="show-footer-button">Xem tất cả</span> {infoButton}
        </span>
      </div>
    </div>
  );
}

export default TopBuy;
