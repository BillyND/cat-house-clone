import React from "react";
import Skeleton from "./Skeleton";
import "./SkeletonCard.scss";
function SkeletonCard(props) {
  return (
    <div className="skeleton-product">
      <div className="image-container">
        <div className="skeleton-image">
          <Skeleton className="img-fluid rounded thumbnail-image" />
        </div>
      </div>

      <div className="product-detail-container pb-2">
        <div className="">
          <h5
            className="dress-name mt-2"
            style={{ height: "40px", padding: "0 " }}
          >
            <Skeleton />
          </h5>
        </div>
      </div>
    </div>
  );
}

export default SkeletonCard;
