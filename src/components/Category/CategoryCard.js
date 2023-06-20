import React from "react";
import "./CategoryCard.scss";

function CategoryCard(props) {
  const { nameTypeCat, imageTypeCat } = props;

  return (
    <div className="category-card-container mb-3 ">
      <div className="iamge-category">
        <img src={imageTypeCat} />
      </div>
      <div className="name-category p-3">
        <span>{nameTypeCat}</span>
      </div>
    </div>
  );
}

export default CategoryCard;
