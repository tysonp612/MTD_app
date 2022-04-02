import React from "react";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import productsDefaultImages from "./../images/techdevices.jpeg";
import { ShowAverage } from "./../rating/average-rating.component";
import { Link } from "react-router-dom";

export const ProductCard = ({ product }) => {
  const { title, description, images, slug, ratings } = product;

  const { Meta } = Card;
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
          <ShoppingCartOutlined />,
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
