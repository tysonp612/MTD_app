import React, { useEffect, useState } from "react";
import { getAllProductsByCount } from "./../../utils/products/products.utils";
import { ProductCard } from "./../../components/card/regular.product-card.component";
import Jumbotron from "./../../components/jumbotron/jumbotron.component";
const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    loadProducts();
  }, []);
  const loadProducts = async () => {
    await getAllProductsByCount(10)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="jumbotron text-primary h1 font-weight-bold text-center p-5">
        <Jumbotron text={["New Arrivals", "Best Sellers", "Latest Product"]} />
      </div>
      <div className="container">
        <div className="row">
          {products.map((product) => {
            return (
              <div className="col-md-4" key={product._id}>
                <ProductCard product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
