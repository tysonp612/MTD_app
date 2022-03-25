import React, { useEffect, useState } from "react";
import { getAllProductsByCount } from "./../../utils/products/products.utils";
import { ProductCard } from "./../../components/card/regular.product-card.component";
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
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h4>All Product</h4>

          <p className="lead">
            This is a modified jumbotron that occupies the entire horizontal
            space of its parent.
          </p>
        </div>
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
