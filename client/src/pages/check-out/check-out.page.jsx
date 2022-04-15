import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CartActionTypes } from "./../../redux/reducers/cart/cart.types";
import { getCart, emptyCart } from "./../../utils/user/user.utils";
import { toast } from "react-toastify";
export const CheckoutPage = () => {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    getCart(user.token)
      .then((res) => {
        setProducts(res.data.products);
        setTotalPrice(res.data.cartTotal);
      })
      .catch((err) => console.log(err));
  };
  const handleEmptyCart = () => {
    //remove from backend
    emptyCart(user.token)
      .then((res) => {
        setProducts([]);
        setTotalPrice(0);
      })
      .catch((err) => console.log(err));
    //remove from redux
    dispatch({ type: CartActionTypes.EMPTY_CART });
    toast.success("Cart is empty, please continue shopping");
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
        <p>Products: {products.length}</p>
        <hr />
        {products.map((prod, i) => {
          return (
            <div key={i}>
              <p>
                {prod.product.title} ({prod.color}) x {prod.cartQuantity} = $
                {prod.price}
              </p>
            </div>
          );
        })}
        <hr />
        <p>Cart Total: ${totalPrice}</p>
        <div className="row">
          <div className="col-md-6">
            <button className="btn btn-primary">Place Order</button>
          </div>
          <div className="col-md-6">
            <button
              className="btn btn-primary"
              onClick={() => handleEmptyCart()}
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
