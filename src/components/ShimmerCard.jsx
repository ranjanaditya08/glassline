import React from "react";
import "./ShimmerCard.css";

const CardShimmer = () => {
  return (
    <div className="card shimmer-card m-2" style={{ width: "18rem" }}>
      <div className="shimmer-thumbnail card-img-top"></div>
      <div className="card-body">
        <h5 className="shimmer-text card-title"></h5>
        <p className="shimmer-text card-text"></p>
        <p className="shimmer-text card-text short"></p>
        <div className="shimmer-button"></div>
      </div>
    </div>
  );
};

const ShimmerCard = () => {
  return (
    <>
      <CardShimmer />
      <CardShimmer />
      <CardShimmer />
      <CardShimmer />
      <CardShimmer />
      <CardShimmer />
      <CardShimmer />
      <CardShimmer />
    </>
  );
};

export default ShimmerCard;
