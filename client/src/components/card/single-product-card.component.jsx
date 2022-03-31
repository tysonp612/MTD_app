import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Card, Tabs, Modal } from "antd";
import { Link } from "react-router-dom";
import {
  HeartOutlined,
  ShoppingCartOutlined,
  StarOutlined,
} from "@ant-design/icons";
import techdevices from "./../images/techdevices.jpeg";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { ProductInfoCard } from "./../card/product-info-card.component";
import StarRatings from "react-star-ratings";
const { TabPane } = Tabs;
export const SingleProduct = ({ product }) => {
  const [star, setStar] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { images, title, description } = product;
  const user = useSelector((state) => state.user.currentUser);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const showUserRatingModal = () => {
    if (user) {
      return (
        <>
          <div onClick={showModal}>
            <StarOutlined className="text-danger" />
            <br />
            Rate this product
          </div>

          <Modal
            title="Basic Modal"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        </>
      );
    } else {
      return (
        <>
          <Link to="/login">
            <StarOutlined className="text-danger" />
            <br />
            Log in to leave a rating
          </Link>
        </>
      );
    }
  };
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
        <h1>{title}</h1>
        <div className="pb-4 ">
          <StarRatings
            rating={star}
            starRatedColor="red"
            numberOfStars={5}
            name="rating"
            isSelectable={true}
            changeRating={(e) => {
              setStar(e);
              console.log(star);
            }}
          />
        </div>

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
            showUserRatingModal(),
          ]}
        >
          <ProductInfoCard product={product} />
        </Card>
      </div>
    </>
  );
};
