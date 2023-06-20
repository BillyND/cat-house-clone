import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import "./Collections.scss";
import CollapseFilter from "./CollapseFilter";
import CollectionBanner from "../../assets/collection_banner.webp";
import ListProducts from "../Products/ListProducts";
import { BiFilterAlt } from "react-icons/bi";
import ModalFilter from "./ModalFilter";
function Collections(props) {
  const navigate = useNavigate();
  const param = useParams();
  const [countProduct, setCountProduct] = useState(0);
  const [filterPrice, setFilterPrice] = useState([]);
  const [removeFilter, setRemoveFilter] = useState(false);
  const [showModalFilter, setShowModalFilter] = useState(false);
  useEffect(() => {
    setShowModalFilter(false);
    window.scrollTo(0, 0);
    if (!param.type) {
      navigate("/collections/all");
    }
  }, [param.type]);

  useEffect(() => {
    window.scrollTo(0, 0);
    // window.scrollTo(0, 0)
  }, [filterPrice]);

  return (
    <div className="collection-content container">
      <div className="nav-link-address pb-2">
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          Trang chủ
        </span>
        <span> / </span>
        <span
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/collections/all")}
        >
          Danh mục
        </span>
        <span> / </span>
        {param.type === "all" ? "Tất cả sản phẩm" : param.type}
      </div>
      <div className="collection-content">
        <div className="collection-filter">
          <CollapseFilter
            setFilterPrice={setFilterPrice}
            removeFilter={removeFilter}
          />
        </div>
        <div className="collection-product">
          <div className="image-collections-banner">
            <img src={CollectionBanner} />
          </div>
          <div className="collection-product-content pt-3">
            <div className="collection-product-header pb-3">
              {param.type === "all" ? (
                <span className="type-collection-header">Tất cả sản phẩm</span>
              ) : (
                <span className="type-collection-header">{param.type}</span>
              )}
              <span>
                <b>{countProduct}</b> sản phẩm
                <span
                  className="icon-filter"
                  onClick={() => setShowModalFilter(true)}
                >
                  Bộ lọc
                  <BiFilterAlt className="icon" />
                </span>
              </span>
            </div>

            {filterPrice.length > 0 && (
              <div className="filter-price mb-3">
                <span>Lọc giá:</span>

                <span className="ms-2">
                  <b>
                    {filterPrice.map((item, index) => {
                      return (
                        <span key={item.id + index}>
                          {filterPrice.length == 1 ? (
                            <> {item}</>
                          ) : (
                            <>
                              {index != 0 && <>,</>}
                              <> </>
                              {item}
                              <> </>
                            </>
                          )}
                        </span>
                      );
                    })}
                  </b>
                </span>
                <span
                  className="close-filter-price ms-2"
                  onClick={() => setRemoveFilter(!removeFilter)}
                >
                  {" "}
                  X
                </span>
              </div>
            )}
            <ListProducts
              collections={param.type}
              setCountProduct={setCountProduct}
              filterPrice={filterPrice[0]}
            />
          </div>
        </div>
      </div>
      <ModalFilter
        show={showModalFilter}
        setShow={setShowModalFilter}
        setFilterPrice={setFilterPrice}
        removeFilter={removeFilter}
        setRemoveFilter={setRemoveFilter}
      />
    </div>
  );
}

export default Collections;
