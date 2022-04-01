import React, { useEffect, useState } from "react";
import { getOneProduct } from "./../../utils/products/products.utils";
import { SingleProduct } from "./../../components/card/single-product-card.component";

export const ProductPage = ({ match }) => {
  const [product, setProduct] = useState({});
  const { slug } = match.params;

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    await getOneProduct(slug)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct product={product} />
      </div>
      <div className="row mt-5 text-center">
        <div>Related Products</div>
      </div>
    </div>
  );
};
