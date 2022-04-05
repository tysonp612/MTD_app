import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ProductCard } from "./../../components/card/regular.product-card.component";
import { SliderComponent } from "./../../components/slider/slider.component";
import {
  getAllProductsByCount,
  productsCount,
} from "./../../utils/products/products.utils";
import { Pagination } from "antd";

export const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [productsQuantity, setProductsQuantity] = useState(0);
  const query = useSelector((state) => state.query.query);
  const input = {
    min: 0,
    max: 5000,
    defaultValue: [0, 0],
  };
  const docPerPages = 9;
  useEffect(() => {
    loadProductsByCount();
    loadProductsCount();
    loadAllProducts();
  }, [page, query]);
  const loadProductsByCount = () => {
    getAllProductsByCount(docPerPages, page)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  };
  const loadAllProducts = () => {
    getAllProductsByCount()
      .then((res) => {
        setAllProducts(res.data);
      })
      .catch((err) => console.log(err));
  };
  const loadProductsCount = () => {
    productsCount()
      .then((res) => {
        setProductsQuantity(res.data);
      })
      .catch((err) => console.log(err));
  };
  const renderProductFromQuery = () => {
    if (query) {
      const queryProdudct = allProducts.filter(
        (prod) =>
          prod.title.toLowerCase().includes(query.toLowerCase()) ||
          prod.description.toLowerCase().includes(query.toLowerCase())
      );
      if (queryProdudct.length) {
        return queryProdudct.map((product) => (
          <div className="col-md-4">
            <ProductCard product={product} />
          </div>
        ));
      } else {
        return <div className="text-center">No Product found</div>;
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
        </>
      );

      return result;
    }
  };
  return (
    <div className="row">
      <div className="col-md-3">
        SEARCH/FILTER
        <SliderComponent input={input} />
      </div>
      <div className="col-md-9 row pt-4">
        {products && allProducts ? renderProductFromQuery() : "Loading"}
      </div>
    </div>
  );
};
