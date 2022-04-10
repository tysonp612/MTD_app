import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { ProductsActionTypes } from "./../../redux/reducers/products/products.types";
import { ProductCard } from "./../../components/card/regular.product-card.component";
import { SliderComponent } from "./../../components/slider/slider.component";
// import { MenuShop } from "./../../components/menu/menu.component";
import {
  getAllProductsByCount,
  productsCount,
  getProductsFromAverageRating,
} from "./../../utils/products/products.utils";
import { getCategories } from "./../../utils/category/category.utils";
import { Pagination, Menu } from "antd";
import StarRatings from "react-star-ratings";
import { DollarOutlined } from "@ant-design/icons";
const { SubMenu } = Menu;
export const ShopPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [showPagination, setShowPagination] = useState(true);
  const [productsQuantity, setProductsQuantity] = useState(0);
  const [products, setProducts] = useState([]);
  const [averageRatingProducts, setAverageRatingProducts] = useState();
  const [categories, setCategories] = useState([]);
  const [star, setStar] = useState(1);
  const [defaultProducts, setDefaultProducts] = useState([]);
  const query = useSelector((state) => state.query.query);

  const input = {
    min: 0,
    max: 5000,
    defaultValue: [0, 0],
  };

  const docPerPages = 9;
  useEffect(() => {
    renderQueryProduct();
  }, [query]);
  useEffect(() => {
    renderProductFromSlider();
    renderProductFromCategory();
    renderProductFromRating();
  }, [products]);
  useEffect(() => {
    loadAllProducts();
    loadProductsCount();
    loadProductsByCount();
    loadCategories();
    loadAverageRating();
  }, [page]);
  //METHOD
  const renderQueryProduct = () => {
    if (query) {
      const queryProducts = allProducts.filter(
        (prod) =>
          prod.title.toLowerCase().includes(query.toLowerCase()) ||
          prod.description.toLowerCase().includes(query.toLowerCase())
      );
      setShowPagination(false);
      return setProducts(queryProducts);
    } else {
      setShowPagination(true);
      return setProducts(defaultProducts);
    }
  };

  //Note
  const renderProductFromRating = (star) => {
    if (star && averageRatingProducts) {
      //filter array of product fetched from db that equal star
      const productWithSameAvgRating = averageRatingProducts.filter(
        (prod) => Math.round(prod.avgRating) === star
      );

      const avgRatingProducts = productWithSameAvgRating.map((aprod) => {
        return allProducts.find((prod) => prod.slug === aprod._id);
      });
      setProducts(avgRatingProducts);
    }
  };

  const renderProductFromSlider = (value) => {
    if (value) {
      const silderProducts = allProducts.filter(
        (prod) => prod.price > value[0] && prod.price < value[1]
      );
      setShowPagination(false);
      return setProducts(silderProducts);
    }
  };
  const renderProductFromCategory = (id) => {
    if (id) {
      const categoryProducts = allProducts.filter(
        (prod) => prod.category._id === id
      );
      console.log(categoryProducts);
      setShowPagination(false);
      return setProducts(categoryProducts);
    }
  };
  const loadAverageRating = () => {
    getProductsFromAverageRating()
      .then((res) => {
        setAverageRatingProducts(res.data);
      })
      .catch((err) => console.log(err));
  };
  const loadProductsByCount = () => {
    getAllProductsByCount(docPerPages, page)
      .then((res) => {
        setProducts(res.data);
        setDefaultProducts(res.data);
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
  const loadCategories = () => {
    getCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="row">
      <div className="col-md-3 pl-3">
        <h4 className="p-3">Search/Filter</h4>
        <hr />
        <Menu defaultOpenKeys={["sub1", "sub2"]} mode="inline" className="pl-2">
          <SubMenu
            key="sub1"
            title={
              <span className="d-flex h6">
                <DollarOutlined className="align-self-center" />
                <span>Price</span>
              </span>
            }
          >
            <Menu.ItemGroup key="g1">
              <Menu.Item key="1">
                <div className="p-3">
                  <SliderComponent
                    input={input}
                    renderProductFromSlider={renderProductFromSlider}
                  />
                </div>
              </Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
          {categories && (
            <SubMenu
              key="sub2"
              title={
                <span className="d-flex h6">
                  <DollarOutlined className="align-self-center" />
                  <span>Categories</span>
                </span>
              }
            >
              <Menu.ItemGroup key="g2">
                {categories.map((category) => (
                  <Menu.Item
                    key={category._id}
                    onClick={(e) => renderProductFromCategory(e.key)}
                  >
                    {category.name}
                  </Menu.Item>
                ))}
              </Menu.ItemGroup>
            </SubMenu>
          )}
          <SubMenu
            key="sub3"
            title={
              <span className="d-flex h6">
                <DollarOutlined className="align-self-center" />
                <span>Rating</span>
              </span>
            }
          >
            <Menu.ItemGroup key="g1">
              <Menu.Item key="1">
                <StarRatings
                  starDimension="20px"
                  starSpacing="2px"
                  starRatedColor="red"
                  changeRating={(e) => renderProductFromRating(e)}
                />
              </Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
        </Menu>
      </div>
      <div className="col-md-9 row pt-4">
        {products.length
          ? products.map((product) => (
              <div className="col-md-4" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))
          : "No product found"}
        {products.length && showPagination ? (
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
