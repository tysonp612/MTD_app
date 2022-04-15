import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCart } from "./../../utils/user/user.utils";
export const CheckoutPage = () => {
  useEffect(() => {
    loadCart();
  }, []);
  const user = useSelector((state) => state.user.currentUser);
  const loadCart = () => {
    getCart(user.token)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  return (
    <div className="row">
      <div className="col-md-6">
        <h4>Delivery Address</h4>
        <br />
        <br />
        Text area
        <button className="btn btn-primary mt-2">Save</button>
        <hr />
        <h4>Got Coupon?</h4>
        <br />
        coupon input and apply button
      </div>
      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <p>Products</p>
        <hr />
        <p>List of products</p>
        <hr />
        <p>Cart Total: x</p>
        <div className="row">
          <div className="col-md-6">
            <button className="btn btn-primary">Place Order</button>
          </div>
          <div className="col-md-6">
            <button className="btn btn-primary">Empty Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};
