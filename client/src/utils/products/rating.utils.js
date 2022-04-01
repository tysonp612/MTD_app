import React from "react";
import StarRatings from "react-star-ratings";
export const ShowAvarage = ({ product }) => {
  const handleStarRatings = (product) => {
    if (product && product.ratings) {
      let ratingsArray = product.ratings;
      let total = [];
      let length = ratingsArray.length;
      ratingsArray.map((rating) => total.push(rating.star));
      let totalReduced = total.reduce((p, n) => {
        return p + n;
      }, 0);
      let result = totalReduced / length;
      return (
        <div className="text-center pt-1 pb-3">
          <StarRatings rating={result} starRatedColor="red" />
        </div>
      );
    }
  };
  return handleStarRatings(product);
};
