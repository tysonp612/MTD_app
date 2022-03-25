import React from "react";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import productsDefaultImages from "./../images/techdevices.jpeg";
import { Link } from "react-router-dom";
export const ProductCard = ({ product }) => {
  const { title, description, images, slug } = product;

  const { Meta } = Card;
  return (
    <Card
      cover={
        <img
          style={{ height: "200px", objectFit: "cover" }}
          className="p-1"
          src={images && images.length ? images[0].url : productsDefaultImages}
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
  );
};
