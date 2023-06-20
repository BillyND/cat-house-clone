import React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useDraggableScroll from "use-draggable-scroll";

function Banner2(props) {
  const navigate = useNavigate();
  const ref = useRef(null);

  const { onMouseDown } = useDraggableScroll(ref);

  return (
    <div
      className="banner-second mb-4 container"
      ref={ref}
      onMouseDown={onMouseDown}
    >
      <div className="banner2-item">
        <div
          className="banner2-item-image"
          onClick={() => navigate("/collections/Mèo")}
        >
          <img src="https://theme.hstatic.net/200000108863/1000985860/14/categorybanner_1_img.jpg?v=3" />
        </div>
        <div className="banner2-item-content">
          <h6 onClick={() => navigate("/collections/Mèo")}>
            Mèo Anh Lông Ngắn
          </h6>
          <p onClick={() => navigate("/collections/Mèo")}>Xem ngay</p>
        </div>
      </div>

      <div className="banner2-item">
        <div
          className="banner2-item-image"
          onClick={() => navigate("/collections/Thức ăn")}
        >
          <img src="https://theme.hstatic.net/200000108863/1000985860/14/categorybanner_2_img.jpg?v=3" />
        </div>
        <div className="banner2-item-content">
          <h6 onClick={() => navigate("/collections/Thức ăn")}>
            Thức ăn và phụ kiện
          </h6>
          <p onClick={() => navigate("/collections/Thức ăn")}>Xem ngay</p>
        </div>
      </div>

      <div className="banner2-item">
        <div
          className="banner2-item-image"
          onClick={() =>
            navigate(`/collections/Dịch vụ Grooming&Spa thú cưng Website
`)
          }
        >
          <img src="https://theme.hstatic.net/200000108863/1000985860/14/categorybanner_3_img.jpg?v=3" />
        </div>
        <div className="banner2-item-content">
          <h6
            onClick={() =>
              navigate(`/collections/Dịch vụ Grooming&Spa thú cưng Website
`)
            }
          >
            Grooming & Spa
          </h6>
          <p
            onClick={() =>
              navigate(`/collections/Dịch vụ Grooming&Spa thú cưng Website
`)
            }
          >
            Xem ngay
          </p>
        </div>
      </div>

      <div className="banner2-item">
        <div
          className="banner2-item-image"
          onClick={() => navigate("/collections/Hotel website")}
        >
          <img src="https://theme.hstatic.net/200000108863/1000985860/14/categorybanner_4_img.jpg?v=3" />
        </div>
        <div className="banner2-item-content">
          <h6 onClick={() => navigate("/collections/Hotel website")}>
            Hotel thú cưng
          </h6>
          <p onClick={() => navigate("/collections/Hotel website")}>Xem ngay</p>
        </div>
      </div>
    </div>
  );
}

export default Banner2;
