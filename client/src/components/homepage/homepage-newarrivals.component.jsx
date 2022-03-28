import React, { useEffect, useState } from "react";
import { getSortedProducts } from "./../../utils/products/products.utils";
import { LoadingCard } from "./../card/loading-card.component";
import { ProductCard } from "./../card/regular.product-card.component";
export const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadProducts();
  }, []);
  const loadProducts = async () => {
    setLoading(true);
    await getSortedProducts("createdAt", "desc", 3)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container">
      {loading ? (
        <LoadingCard count={3} />
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
  );
};
