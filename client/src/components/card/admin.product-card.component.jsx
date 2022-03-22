import React from "react";
import { Card } from "antd";
import "antd/dist/antd.css";
import productsDefaultImages from "./../images/techdevices.jpeg";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
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
          style={{ height: "200px", objectFit: "cover" }}
          className="p-1"
          src={images && images.length ? images[0].url : productsDefaultImages}
        />
      }
      actions={[
        <EditOutlined className="text-warning" />,
        <DeleteOutlined className="text-danger" />,
      ]}
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 40)}...`}
      />
    </Card>
  );
};
export default AdminProductCard;
