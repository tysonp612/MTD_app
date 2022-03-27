import React, { useEffect, useState } from "react";
import { getAllProductsByCount } from "./../../utils/products/products.utils";
import { ProductCard } from "./../../components/card/regular.product-card.component";
import { LoadingCard } from "./../../components/card/loading-card.component";
import Jumbotron from "./../../components/jumbotron/jumbotron.component";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadProducts();
  }, []);
  const loadProducts = async () => {
    setLoading(true);
    await getAllProductsByCount(9)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="jumbotron text-primary h1 font-weight-bold text-center p-5">
        <Jumbotron text={["New Arrivals", "Best Sellers", "Latest Product"]} />
      </div>
      <div className="container">
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
      </div>
    </div>
  );
};

export default Home;
