import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Card, Tabs } from "antd";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  HeartOutlined,
  ShoppingCartOutlined,
  StarOutlined,
} from "@ant-design/icons";
import techdevices from "./../images/techdevices.jpeg";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { ModalComponent } from "./../../components/modal/modal.component";
import { ProductInfoCard } from "./../card/product-info-card.component";
import StarRatings from "react-star-ratings";
const { TabPane } = Tabs;
export const SingleProduct = ({ product }) => {
  const [star, setStar] = useState(1);
  const { images, title, description } = product;
  const user = useSelector((state) => state.user.currentUser);
  const history = useHistory();
  const param = useParams();
  const showUserRatingModal = () => {
    if (user) {
      return (
        <>
          <ModalComponent
            button={<StarOutlined className="text-danger" />}
            title="Leave a rating"
            user={user}
            rating={
              <StarRatings
                rating={star}
                starRatedColor="blue"
                changeRating={(e) => setStar(e)}
                numberOfStars={5}
                starHoverColor="blue"
                name="rating"
              />
            }
          />
        </>
      );
    } else {
      return (
        <div onClick={(e) => handleHistory(e)}>
          <StarOutlined className="text-danger" />
          <br />
          Log in to leave a rating
        </div>
      );
    }
  };
  const handleHistory = (e) => {
    e.preventDefault();
    history.push({
      pathname: "/login",
      state: { from: `/product/${param.slug}` },
    });
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
            isSelectable={false}
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
