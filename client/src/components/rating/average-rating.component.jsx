import React from "react";
import StarRatings from "react-star-ratings";
export const ShowAverage = ({ product }) => {
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
          <StarRatings
            starDimension="25px"
            starSpacing="2px"
            rating={result}
            starRatedColor="red"
            editing={false}
          />
          ({product.ratings.length})
        </div>
      );
    }
  };
  return handleStarRatings(product);
};
