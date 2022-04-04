import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ProductCard } from "./../../components/card/regular.product-card.component";
import {
  getAllProductsByCount,
  productsCount,
} from "./../../utils/products/products.utils";
import { Pagination } from "antd";

export const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [productsQuantity, setProductsQuantity] = useState(0);
  const query = useSelector((state) => state.query.query);

  const docPerPages = 9;
  useEffect(() => {
    loadProducts();
    loadProductsCount();
  }, [page, query]);
  const loadProducts = () => {
    getAllProductsByCount(docPerPages, page)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };
  const loadProductsCount = () => {
    productsCount()
      .then((res) => {
        setProductsQuantity(res.data);
      })
      .catch((err) => console.log(err));
  };
  const renderProductFromQuery = (products) => {
    if (query) {
      const queryProd = products.filter(
        (prod) =>
          prod.title.toLowerCase().includes(query.toLowerCase()) ||
          prod.description.toLowerCase().includes(query.toLowerCase())
      );
      console.log(queryProd);
      if (queryProd) {
        return queryProd.map((prod) => (
          <div className="col-md-4">
            <ProductCard product={prod} />
          </div>
        ));
      } else {
        return (
          <div className="col-md-4">
            <p>No Product found</p>
          </div>
        );
      }
    } else {
      const result = (
        <>
          {products.map((product) => (
            <div key={product._id} className="col-md-4">
              <ProductCard product={product} />
            </div>
          ))}
          <Pagination
            className="text-center pt-3"
            current={page}
            total={Math.round((productsQuantity / docPerPages) * 10)}
            onChange={(value) => {
              setPage(value);
            }}
          />
          ;
        </>
      );

      return result;
    }
  };
  return (
    <div className="row">
      <div className="col-md-3">SEARCH/FILTER</div>
      <div className="col-md-9 row pt-4">
        {products ? renderProductFromQuery(products) : ""}
        <div></div>
      </div>
    </div>
  );
};
