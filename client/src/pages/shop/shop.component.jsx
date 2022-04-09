import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ProductsActionTypes } from "./../../redux/reducers/products/products.types";
import { ProductCard } from "./../../components/card/regular.product-card.component";
import { SliderComponent } from "./../../components/slider/slider.component";
import {
  getAllProductsByCount,
  productsCount,
} from "./../../utils/products/products.utils";
import { Pagination } from "antd";

export const ShopPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [page, setPage] = useState(1);

  const [productsQuantity, setProductsQuantity] = useState(0);
  const [products, setProducts] = useState([]);
  const query = useSelector((state) => state.query.query);

  const input = {
    min: 0,
    max: 5000,
    defaultValue: [0, 0],
  };
  const dispatch = useDispatch();
  const docPerPages = 9;
  useEffect(() => {
    renderQueryProduct();
  }, [query]);
  useEffect(() => {
    renderProductFromSlider();
  }, [input]);
  useEffect(() => {
    loadAllProducts();
    loadProductsCount();
    loadProductsByCount();
  }, [page]);
  //METHOD
  const renderQueryProduct = () => {
    if (query) {
      const queryProducts = allProducts.filter(
        (prod) =>
          prod.title.toLowerCase().includes(query.toLowerCase()) ||
          prod.description.toLowerCase().includes(query.toLowerCase())
      );
      return setProducts(queryProducts);
    }
  };
  const renderProductFromSlider = (value) => {
    if (value) {
      const silderProducts = allProducts.filter(
        (prod) => prod.price > value[0] && prod.price < value[1]
      );
      return setProducts(silderProducts);
    }
  };
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

  return (
    <div className="row">
      <div className="col-md-3">
        SEARCH/FILTER
        <SliderComponent
          input={input}
          renderProductFromSlider={renderProductFromSlider}
        />
      </div>
      <div className="col-md-9 row pt-4">
        {products.length
          ? products.map((product) => (
              <div className="col-md-4" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))
          : "No product found"}
        {products.length && products.length >= 9 ? (
          <Pagination
            className="text-center pt-3"
            current={page}
            total={Math.round((productsQuantity / docPerPages) * 10)}
            onChange={(value) => {
              setPage(value);
            }}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
