import React, { useEffect, useState } from "react";
import "../SearchProduct/SearchProduct.scss";
import { RiSearch2Line } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import { getAllProducts, getApiSearch } from "../services/apiServices";
import ProductCard from "../Products/ProductCard";
import SkeletonCard from "../SkeletonCard/SkeletonCard";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { changeRouteRedux } from "../../redux/actions/routerActions";
import Carousel3d from "../Carousel3d/Carousel3d";
import { v4 as uuidv4 } from "uuid";

function CategoryDetail(props) {
  const dispatch = useDispatch();
  const param = useParams();
  const [dataSeach, setDataSearch] = useState([]);
  const [keySearch, setKeySearch] = useState(param.keyWord || "");
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setIsloading(false);
    fetchProductSearchWord();
    window.scrollTo(0, 0);
  }, [param.keyWord]);

  useEffect(() => {
    dispatch(changeRouteRedux(2));
    fetchProductSearchWord();
    window.scrollTo(0, 0);
  }, []);

  const fetchProductSearchWord = async () => {
    try {
      const resSearch = await getApiSearch(param.keyWord);
      setDataSearch(resSearch);
      if (resSearch) {
        setTimeout(() => {
          setIsloading(true);
        }, 300);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    if (keySearch) {
      setIsloading(false);
    }
    if (keySearch !== param.keyWord) {
      navigate(`/search-product/${keySearch}`);
    } else {
      fetchProductSearchWord();
    }
  };

  return (
    <div className="search-product-page  pb-5 container">
      <div className="nav-link-address pb-2">
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          Trang chủ
        </span>
        <span> / </span>
        <span
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/category")}
        >
          Giống mèo cảnh
        </span>
        <span> / </span>
        {param.keyWord}
      </div>
      <div>
        <h4 className="text-center pt-3">{param.keyWord}</h4>
      </div>

      <hr />

      {!isLoading && (
        <div className="listProduct-content  p-0">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}
      {dataSeach.length > 0 && isLoading ? (
        <>
          <div className="listProduct-content  p-0">
            {isLoading &&
              dataSeach.map((product) => {
                return <ProductCard key={uuidv4()} product={product} />;
              })}
          </div>
        </>
      ) : (
        <>
          {!isLoading ? (
            <></>
          ) : (
            <div
              className="text-center pb-5 mb-5"
              style={{ fontWeight: "600" }}
            >
              Hiện chưa cập nhật
            </div>
          )}
        </>
      )}
      <hr />
      <h4 className="text-left">Giống mèo cảnh khác</h4>
      <div className="other-category">
        <Carousel3d />
      </div>
    </div>
  );
}

export default CategoryDetail;
