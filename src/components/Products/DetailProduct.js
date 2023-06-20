import React, { useEffect, useState } from "react";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../services/apiServices";
import "./DetailProduct.scss";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  addToCartRedux,
  decreaseCart,
  increaseCart,
  SHOW_CART,
} from "../../redux/actions/productActions";
import _ from "lodash";
import { toast } from "react-toastify";
import { changeRouteRedux } from "../../redux/actions/routerActions";
import { TbShoppingCartPlus } from "react-icons/";

function DetailProduct(props) {
  const dataAllProduct = useSelector((state) => state.product.product);
  const dataAddToCart = useSelector((state) => state.product.cartProduct);
  const navigate = useNavigate();
  const param = useParams();
  const [dataDetail, setDataDetail] = useState({});
  const dispatch = useDispatch();
  const [quantityDetail, setQuantityDetail] = useState(1);
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(changeRouteRedux(-1));
  }, []);

  useEffect(() => {
    findProduct();
  }, [param]);

  const handleAddCart = (data) => {
    dispatch(addToCartRedux(data));
    toast.success("Thêm vào giỏ hàng thành công!");
  };

  const findProduct = async () => {
    const findChoosed = dataAddToCart.find((item) => +item.id === +param.id);
    const find = dataAllProduct.find((item) => +item.id === +param.id);

    if (find) {
      setDataDetail(find);
    } else {
      const resDetaiPr = await getProductById(param.id);
      setDataDetail(resDetaiPr);
    }
  };

  const images = [
    {
      original: dataDetail.image1,
      thumbnail: dataDetail.image1,
    },
    {
      original: dataDetail.image2 ? dataDetail.image2 : dataDetail.image1,
      thumbnail: dataDetail.image2,
    },
    {
      original: dataDetail.image3,
      thumbnail: dataDetail.image3,
    },
  ];

  const handelIncreaseProduct = (data) => {
    handleAddCart(data);
    for (let i = 2; i <= quantityDetail; i++) {
      dispatch(increaseCart(data));
    }
  };

  var number = +dataDetail.price;
  const resultPrice =
    number.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 3,
    }) + " đ";
  return (
    <div className="detail-product container">
      <div className="nav-link-address pb-2">
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          Trang chủ{" "}
        </span>
        /{" "}
        <span
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/collections/${dataDetail.collection}`)}
        >
          {dataDetail.collection}
        </span>{" "}
        / {dataDetail.description}
      </div>
      <div className="detail-product-content">
        <div className="img-detail">
          <ReactImageGallery className="image" items={images} />
        </div>
        <div className="content-detail">
          <div className="footer-detail ">
            <h5>{dataDetail.description}</h5>
            <div className="price mt-4">
              <span>Giá:</span>
              <span className="price-product">{resultPrice}</span>
            </div>
            <div className="quantity-product-detail mt-5">
              <span className="label-quantity ms-2 me-5">Số lượng</span>
              <div className="footer-product-detail">
                <div className="quantity">
                  <span
                    className="minus"
                    onClick={() =>
                      setQuantityDetail(
                        quantityDetail < 2 ? 1 : quantityDetail - 1
                      )
                    }
                  >
                    -
                  </span>
                  <span>{quantityDetail}</span>
                  <span
                    className="plus"
                    onClick={() => setQuantityDetail((prev) => prev + 1)}
                  >
                    +
                  </span>
                </div>
              </div>
            </div>
            <div className="button-footer">
              <button
                onClick={() => handelIncreaseProduct(dataDetail)}
                className="btn btn-danger add-to-cart"
              >
                Thêm vào giỏ
              </button>

              <button
                onClick={() =>
                  dispatch({
                    type: SHOW_CART,
                    payload: true,
                  })
                }
                className="btn btn-danger go-to-cart"
              >
                Đi tới giỏ hàng
              </button>
            </div>

            <div className="detail-product-sale ">
              <div className="icon-sale">
                <img src="https://theme.hstatic.net/200000108863/1000985860/14/product_deliverly_1_ico.png?v=3" />
                <span>Cam kết 100% chính hãng</span>
              </div>
              <div className="icon-sale">
                <img src="https://theme.hstatic.net/200000108863/1000985860/14/product_deliverly_2_ico.png?v=3" />
                <span>Miễn phí giao hàng</span>
              </div>
              <div className="icon-sale">
                <img src="https://theme.hstatic.net/200000108863/1000985860/14/product_deliverly_3_ico.png?v=3" />
                <span>Hỗ trợ 24/7</span>
              </div>
              <div className="icon-sale">
                <img src="https://theme.hstatic.net/200000108863/1000985860/14/product_deliverly_4_ico.png?v=3" />
                <span>Hoàn tiền 111% nếu hàng giả</span>
              </div>
              <div className="icon-sale">
                <img src="https://theme.hstatic.net/200000108863/1000985860/14/product_deliverly_5_ico.png?v=3" />
                <span>Mở hộp kiểm tra nhận hàng</span>
              </div>
              <div className="icon-sale">
                <img src="https://theme.hstatic.net/200000108863/1000985860/14/product_deliverly_6_ico.png?v=3" />
                <span>Đổi trả trong 7 ngày</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
