import React, { useEffect, useState } from "react";
import "./SearchProduct.scss";
import { RiSearch2Line } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import { getAllProducts, getApiSearch } from "../services/apiServices";
import ProductCard from "../Products/ProductCard";
import SkeletonCard from "../SkeletonCard/SkeletonCard";
import { toast } from "react-toastify";
import { changeRouteRedux } from "../../redux/actions/routerActions";
import { useDispatch } from "react-redux";

function SearchProduct(props) {
  const param = useParams();
  const dispatch = useDispatch();
  const [dataSeach, setDataSearch] = useState([]);
  const [keySearch, setKeySearch] = useState(param.keyWord || "");
  const [isLoading, setIsloading] = useState(true);
  const navigate = useNavigate();
  const [keyWord, setKeyWord] = useState("");

  useEffect(() => {
    fetchProductSearchWord();
    window.scrollTo(0, 0);
    setKeySearch(param.keyWord);
  }, [param.keyWord || keySearch]);

  useEffect(() => {
    fetchProductSearchWord();
    window.scrollTo(0, 0);
  }, []);

  const fetchProductSearchWord = async () => {
    setKeySearch(param.keyWord || "");

    if (param.keyWord) {
      setIsloading(false);
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
    }
  };

  const handleSearch = () => {
    if (keySearch) {
      setIsloading(false);
    } else {
      toast.error("DDien");
    }
    if (keySearch !== param.keyWord) {
      navigate(`/search-product/${keySearch}`);
    } else {
      fetchProductSearchWord();
    }
  };
  const handleSearchKeyWord = () => {
    setKeyWord("");
    if (keyWord) {
      navigate(`/search-product/${keyWord}`);
    } else {
      navigate(`/search-product`);
    }
  };

  const handleKeyPress = (e) => {
    let key = e.keyCode || e.which;
    if (key == 13) {
      handleSearch();
    }
  };

  return (
    <div className=" search-product-page pb-5">
      <div className="search-product-header text-center ">
        <div className="label-product">
          <h4 className="text-center">Tìm kiếm</h4>
        </div>
      </div>

      {!isLoading && (
        <div className="listProduct-content  p-0">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}
      {dataSeach.length > 0 && isLoading ? (
        <>
          <div className="label-product text-center">
            {param.keyWord && (
              <p>
                Có <b>{dataSeach.length} sản phẩm</b> cho tìm kiếm
              </p>
            )}
          </div>
          <hr />
          <p className=" mx-3">
            Kết quả tìm kiếm cho "<b>{keySearch}</b>"
          </p>
          <div className="listProduct-content  p-0">
            {isLoading &&
              dataSeach.map((product, index) => {
                return (
                  <ProductCard key={product.id + index} product={product} />
                );
              })}
          </div>
        </>
      ) : (
        <>
          <hr />
          {!isLoading ? (
            <></>
          ) : (
            <div
              className="text-center pb-5 mb-5"
              style={{ fontWeight: "600" }}
            >
              {keySearch && (
                <>
                  Không tìm thấy nội dung bạn yêu cầu
                  <p style={{ fontWeight: "400" }}>
                    Không tìm thấy "<b>{keySearch}</b>". Vui lòng kiểm tra chính
                    tả, sử dụng các từ tổng quát hơn và thử lại!
                  </p>
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default SearchProduct;
