import React from "react";
import "./SkeletonCard.scss";

function Skeleton({ className = "" }) {
  return (
    <div className={`gallery `}>
      <div className="skeleton4">
        <p className="skeleton-content">skeleton</p>
      </div>
    </div>
  );
}

export default Skeleton;
