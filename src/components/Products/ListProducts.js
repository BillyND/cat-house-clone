import React, { useEffect, useState } from "react";
import { fetchAllProductsRedux } from "../../redux/actions/productActions";
import { getAllProducts } from "../../components/services/apiServices";
import { useDispatch, useSelector } from "react-redux";
import "./Product.scss";
import ProductCard from "./ProductCard";
import _ from "lodash";
import SkeletonCard from "../SkeletonCard/SkeletonCard";
import { v4 as uuidv4 } from "uuid";
const ListProducts = (props) => {
  const dataAllProduct = useSelector((state) => state.product.product);
  const { limitProduct, collections, setCountProduct, filterPrice } = props;
  const dispatch = useDispatch();
  const [dataNew, setDataNew] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  useEffect(() => {
    dispatch(fetchAllProductsRedux());
    fetchAllProduct();
  }, [collections]);

  useEffect(() => {
    fetchAllProduct();
  }, [filterPrice]);

  const handleFilterPrice = (filterPrice, dataFilterPrice, dataCollections) => {
    switch (filterPrice) {
      case "Dưới 1.000.000đ":
        dataFilterPrice = dataCollections.filter((item, index) => {
          if (item.price < 1000000) {
            return item;
          }
        });
        setDataNew(dataFilterPrice);
        setCountProduct(dataFilterPrice.length);
        break;
      case "1.000.000đ - 2.000.000đ":
        dataFilterPrice = dataCollections.filter((item, index) => {
          if (item.price > 999999 && item.price < 2000000) {
            return item;
          }
        });
        setDataNew(dataFilterPrice);
        setCountProduct(dataFilterPrice.length);
        break;
      case "2.000.000đ - 3.000.000đ":
        dataFilterPrice = dataCollections.filter((item, index) => {
          if (item.price > 1999999 && item.price < 3000000) {
            return item;
          }
        });
        setDataNew(dataFilterPrice);
        setCountProduct(dataFilterPrice.length);
        break;
      case "3.000.000đ - 4.000.000đ":
        dataFilterPrice = dataCollections.filter((item, index) => {
          if (item.price > 2999999 && item.price < 4000000) {
            return item;
          }
        });
        setDataNew(dataFilterPrice);
        setCountProduct(dataFilterPrice.length);
        break;
      case "Trên 4.000.000đ":
        dataFilterPrice = dataCollections.filter((item, index) => {
          if (item.price > 4000000) {
            return item;
          }
        });
        setDataNew(dataFilterPrice);
        setCountProduct(dataFilterPrice.length);
        break;
      default:
        break;
    }
  };

  const fetchAllProduct = async () => {
    try {
      let dataNewReverse;
      let dataCollections;
      let dataFilterPrice;
      if (dataAllProduct && dataAllProduct.length > 0) {
        dataNewReverse = dataAllProduct;
      } else {
        dataNewReverse = await getAllProducts();
        dataNewReverse.reverse();
      }

      if (collections.length > 0) {
        if (collections === "all") {
          setDataNew(dataNewReverse);
          setCountProduct(dataNewReverse.length);
          handleFilterPrice(filterPrice, dataFilterPrice, dataNewReverse);
        } else {
          dataCollections = dataNewReverse.filter(
            (item) => item.collection == collections
          );

          setDataNew(dataCollections);
          setTimeout(() => {
            setIsloading(true);
          }, 300);
          setCountProduct(dataCollections.length);
        }
      } else {
        dataCollections = dataNewReverse.filter(
          (item) => item.collection === "Mèo"
        );
        setDataNew(dataCollections);
      }
      handleFilterPrice(filterPrice, dataFilterPrice, dataCollections);

      setTimeout(() => {
        setIsloading(true);
      }, 300);
    } catch (error) {
      // console.log(error)
    }
  };
  return (
    <>
      {dataNew.length <= 0 && (
        <span className="container">Chưa có sản phẩm nào trong mục này</span>
      )}
      <div className="listProduct-content ">
        {!isLoading && (
          <>
            <SkeletonCard className="skeleton-card" />
            <SkeletonCard className="skeleton-card" />
            <SkeletonCard className="skeleton-card" />
            <SkeletonCard className="skeleton-card" />
            <SkeletonCard className="skeleton-card" />
            <SkeletonCard className="skeleton-card" />
          </>
        )}

        {isLoading &&
          dataNew.map((product, index) => {
            return (
              <div key={uuidv4()}>
                {dataNew.length > 0 ? (
                  <>
                    {limitProduct ? (
                      <>
                        {index < limitProduct && (
                          <ProductCard key={uuidv4()} product={product} />
                        )}
                      </>
                    ) : (
                      <ProductCard key={index} product={product} />
                    )}
                  </>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ListProducts;
