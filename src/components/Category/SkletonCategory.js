import React from "react";
import Skeleton from "../SkeletonCard/Skeleton";
import "./SkeletonCategory.scss";

function SkletonCategory(props) {
  return (
    <div className="category-skeleton-container ">
      <div className="iamge-category">
        <Skeleton />
      </div>
      <div className="name-category mt-4">
        <Skeleton />
      </div>
    </div>
  );
}

export default SkletonCategory;
