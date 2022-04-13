import React from "react";
import { useDispatch } from "react-redux";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import productsDefaultImages from "./../images/techdevices.jpeg";
import { ShowAverage } from "./../rating/average-rating.component";
import { ProductsActionTypes } from "./../../redux/reducers/products/products.types";
import { Link } from "react-router-dom";

export const ProductCard = ({ product }) => {
  const { title, description, images, slug, ratings } = product;
  const dispatch = useDispatch();
  const { Meta } = Card;
  const handleAddToCart = () => {
    dispatch({
      type: ProductsActionTypes.STORE_PRODUCTS_TO_CART,
      payload: product,
    });
  };
  return (
    <>
      {ratings && ratings.length ? (
        <ShowAverage product={product} />
      ) : (
        <div className="text-center pb-3">No rating yet</div>
      )}

      <Card
        cover={
          <img
            style={{ height: "200px", objectFit: "cover" }}
            className="p-1"
            src={
              images && images.length ? images[0].url : productsDefaultImages
            }
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-warning" />
          </Link>,
          <ShoppingCartOutlined onClick={handleAddToCart} />,
        ]}
      >
        <Meta
          title={title}
          description={`${description && description.substring(0, 40)}...`}
        />
      </Card>
    </>
  );
};
