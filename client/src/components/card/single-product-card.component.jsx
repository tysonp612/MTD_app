import React, { useState, useEffect } from "react";
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
import { ShowAvarage } from "./../../utils/products/rating.utils";
import { updateStarRating } from "./../../utils/products/products.utils";
import StarRatings from "react-star-ratings";

const { TabPane } = Tabs;

export const SingleProduct = ({ product }) => {
  const [star, setStar] = useState();
  const { _id, ratings, images, title, description } = product;
  const user = useSelector((state) => state.user.currentUser);
  const history = useHistory();
  const param = useParams();

  useEffect(() => {
    if (product.ratings && user) {
      const existingRating = product.ratings.find(
        (rating) => rating.postedBy.toString() === user._id.toString()
      );
      if (existingRating) setStar(existingRating.star);
    }
  });
  const handleStarRating = async (e) => {
    setStar(e);
    await updateStarRating(_id, user.token, e)
      .then()
      .catch((err) => console.log(err));
  };

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
                changeRating={(e) => handleStarRating(e)}
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
        {product && product.ratings && product.ratings.length ? (
          <ShowAvarage className="pb-4 " product={product} />
        ) : (
          <div className="text-center pb-3">No ratings yet</div>
        )}

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
