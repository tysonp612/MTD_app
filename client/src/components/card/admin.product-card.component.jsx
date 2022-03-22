import React from "react";
import { Card } from "antd";
import "antd/dist/antd.css";
const { Meta } = Card;

const AdminProductCard = ({ product }) => {
  const {
    title,
    description,
    price,
    category,
    subcategory,
    quantity,
    images,
    shipping,
    color,
    brand,
  } = product;

  return (
    <Card
      cover={
        <img
          style={{ height: "150px", objectFit: "cover" }}
          className="p-1"
          src={images && images.length ? images[0].url : ""}
        />
      }
    >
      <Meta title={title} description={description} />
    </Card>
  );
};
export default AdminProductCard;
