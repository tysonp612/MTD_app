import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Tabs } from "antd";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  HeartOutlined,
  ShoppingCartOutlined,
  StarOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { CartActionTypes } from "./../../redux/reducers/cart/cart.types";
import techdevices from "./../images/techdevices.jpeg";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import { ModalComponent } from "./../../components/modal/modal.component";
import { ProductInfoCard } from "./../card/product-info-card.component";
import { ShowAverage } from "./../rating/average-rating.component";

import StarRatings from "react-star-ratings";

const { TabPane } = Tabs;

export const SingleProduct = ({ star, handleStarRating, product }) => {
  const { images, title, description } = product;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const cartItems = useSelector((state) => state.cart.cartItems);
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
  const checkItemInCart = () => {
    const itemInCart = cartItems.find(
      (cartItem) => cartItem._id === product._id
    );
    if (itemInCart) {
      return (
        <Link to={`/cart`}>
          <CheckOutlined disabled={true} />
          <br />
          Item added to cart
        </Link>
      );
    } else {
      return (
        <>
          <ShoppingCartOutlined
            onClick={handleAddToCart}
            className="text-warning"
          />
          <br />
          Add to cart
        </>
      );
    }
  };
  const handleAddToCart = () => {
    dispatch({
      type: CartActionTypes.ADD_TO_CART,
      payload: product,
    });
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
        <h2 className="text-center">{title}</h2>
        {product && product.ratings && product.ratings.length ? (
          <ShowAverage className="pb-4 " product={product} />
        ) : (
          <div className="text-center pb-3">No ratings yet</div>
        )}

        <Card
          actions={[
            <>{checkItemInCart()}</>,
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
