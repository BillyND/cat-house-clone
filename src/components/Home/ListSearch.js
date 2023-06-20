import React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useDraggableScroll from "use-draggable-scroll";

function ListSearch(props) {
  const ref = useRef(null);

  const { onMouseDown } = useDraggableScroll(ref);
  const navigate = useNavigate();

  return (
    <div
      className="home-page-list-search container"
      ref={ref}
      onMouseDown={onMouseDown}
    >
      <div className="list-search-item header">
        <h6 className="header-home-page-list-search">Xu hướng tìm kiếm</h6>
        <button
          className="btn-home-page-list-search"
          onClick={() => navigate("/collections/all")}
        >
          xem ngay
        </button>
      </div>
      <div
        className="list-search-item"
        onClick={() => navigate("/collections/Mèo")}
      >
        <div>
          <img src="https://theme.hstatic.net/200000108863/1000985860/14/categorize_1_img.jpg?v=3" />
        </div>
        <p>Mèo Anh</p>
      </div>

      <div
        className="list-search-item"
        onClick={() => navigate("/collections/Thức ăn")}
      >
        <div>
          <img src="https://theme.hstatic.net/200000108863/1000985860/14/categorize_2_img.jpg?v=3" />
        </div>
        <p>Thức ăn</p>
      </div>

      <div
        className="list-search-item"
        onClick={() => navigate("/collections/Sữa, Thực phẩm bổ sung")}
      >
        <div>
          <img src="https://theme.hstatic.net/200000108863/1000985860/14/categorize_3_img.jpg?v=3" />
        </div>
        <p>Dinh dưỡng</p>
      </div>

      <div
        className="list-search-item"
        onClick={() => navigate("/collections/Vệ sinh")}
      >
        <div>
          <img src="https://theme.hstatic.net/200000108863/1000985860/14/categorize_4_img.jpg?v=3" />
        </div>
        <p>Vệ sinh</p>
      </div>

      <div
        className="list-search-item"
        onClick={() => navigate("/collections/Sữa tắm")}
      >
        <div>
          <img src="https://theme.hstatic.net/200000108863/1000985860/14/categorize_5_img.jpg?v=3" />
        </div>
        <p>Sữa tắm</p>
      </div>

      <div
        className="list-search-item"
        onClick={() => navigate("/collections/Sức khoẻ")}
      >
        <div>
          <img src="https://theme.hstatic.net/200000108863/1000985860/14/categorize_6_img.jpg?v=3" />
        </div>
        <p>Sức khoẻ</p>
      </div>

      <div
        className="list-search-item"
        onClick={() => navigate("/collections/Phụ kiện")}
      >
        <div>
          <img src="https://theme.hstatic.net/200000108863/1000985860/14/categorize_7_img.jpg?v=3" />
        </div>
        <p>Phụ kiện</p>
      </div>

      <div
        className="list-search-item"
        onClick={() => navigate("/collections/Đồ chơi")}
      >
        <div>
          <img src="https://theme.hstatic.net/200000108863/1000985860/14/categorize_8_img.jpg?v=3" />
        </div>
        <p>Đồ chơi</p>
      </div>
    </div>
  );
}

export default ListSearch;
