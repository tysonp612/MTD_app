import React from "react";
import { Card, Tabs } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import techdevices from "./../images/techdevices.jpeg";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { ProductInfoCard } from "./../card/product-info-card.component";
const { TabPane } = Tabs;
export const SingleProduct = ({ product }) => {
  const { images, title, description } = product;
  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} infiniteLoop>
            {images.map((images) => {
              return <img src={images.url} key={images.public_id} />;
            })}
          </Carousel>
        ) : (
          <img
            src={techdevices}
            style={{ height: "600px", width: "100%", objectFit: "contain" }}
          />
        )}
        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description ? description : ""}
          </TabPane>
          <TabPane tab="More" key="2">
            Call use on xxx xxx xxxx to learn more about this product
          </TabPane>
        </Tabs>
      </div>
      <div className="col-md-5">
        <Card
          actions={[
            <>
              <ShoppingCartOutlined className="text-warning" />
              Add to Cart
            </>,
            <Link to="/">
              <HeartOutlined className="text-danger" />
              <br />
              Add to Wishlist
            </Link>,
          ]}
        >
          <ProductInfoCard product={product} />
        </Card>
      </div>
    </>
  );
};
