import React, { useEffect, useState } from "react";
import { getOneProduct } from "./../../utils/products/products.utils";

export const ProductPage = ({ match }) => {
  const [product, setProduct] = useState({});
  const { slug } = match.params;
  const { title } = product;
  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    await getOneProduct(slug)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  };
  return <h1>{title}</h1>;
};
