import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllCategoryAction } from "../../redux/actions/productActions";
import { changeRouteRedux } from "../../redux/actions/routerActions";
import { getAllCategory } from "../services/apiServices";
import CategoryCard from "./CategoryCard";
import SkeletonCategory from "./SkletonCategory";
import { v4 as uuidv4 } from "uuid";
function Category(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataCategoryRedux = useSelector((state) => state.product.allCategory);
  const [dataCategory, setDataCategory] = useState(dataCategoryRedux);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchDataCategory();
    window.scrollTo(0, 0);
    window.scrollTo(0, 0);
    window.scrollTo(0, 0);
    dispatch(changeRouteRedux(2));
  }, []);

  const fetchDataCategory = async () => {
    if (dataCategoryRedux && dataCategoryRedux.length > 0) {
      try {
        setDataCategory(dataCategoryRedux);
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
        dispatch(getAllCategoryAction());
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const resApiCategory = await getAllCategory();
        setDataCategory(resApiCategory);
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
        dispatch(getAllCategoryAction());
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handelClickCategory = (event) => {
    navigate(`/category/${event.name}`);
  };

  return (
    <div className="category-container container">
      <div className="nav-link-address pb-2">
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          Trang chủ{" "}
        </span>
        / Giống mèo cảnh ({dataCategory.length})
      </div>
      <div className="category-content ">
        {isLoading && (
          <>
            <SkeletonCategory />
            <SkeletonCategory />
            <SkeletonCategory />
            <SkeletonCategory />
            <SkeletonCategory />
            <SkeletonCategory />
          </>
        )}
        {!isLoading &&
          dataCategory.map((item) => {
            return (
              <div key={uuidv4()} onClick={() => handelClickCategory(item)}>
                <CategoryCard
                  nameTypeCat={item.name}
                  imageTypeCat={item.image}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Category;
