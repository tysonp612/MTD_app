import React, { useEffect, useState } from "react";

import { NewArrivals } from "./../../components/homepage/homepage-newarrivals.component";
import { BestSellers } from "./../../components/homepage/homepage-bestsellers.component";
import Jumbotron from "./../../components/jumbotron/jumbotron.component";
const Home = () => {
  return (
    <div>
      <div className="jumbotron text-primary h1 font-weight-bold text-center p-5 display-3">
        <Jumbotron text={["New Arrivals", "Best Sellers", "Latest Product"]} />
      </div>
      <h4 className="text-center p-3 mt-5 mb-5 display-5 jumbotron">
        New Arrivals
      </h4>
      <NewArrivals />
      <h4 className="text-center p-3 mt-5 mb-5 display-5 jumbotron">
        Best Sellers
      </h4>
      <BestSellers />
      {/* <div className="container">
        {loading ? (
          <LoadingCard count={9} />
        ) : (
          <div className="row">
            {products.map((product) => {
              return (
                <div className="col-md-4" key={product._id}>
                  <ProductCard product={product} />
                </div>
              );
            })}
          </div>
        )}
      </div> */}
    </div>
  );
};

export default Home;
