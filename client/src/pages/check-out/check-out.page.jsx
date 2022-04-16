import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CartActionTypes } from "./../../redux/reducers/cart/cart.types";
import {
  getCart,
  emptyCart,
  updateAddress,
} from "./../../utils/user/user.utils";
import { toast } from "react-toastify";

export const CheckoutPage = () => {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [address, setAddress] = useState({
    streetAddress: "",
    postalCode: "",
  });
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

  const handleAddress = (e) => {
    e.preventDefault();
    const stringAddress = `${address.streetAddress},${address.postalCode}`;
    updateAddress(user.token, stringAddress)
      .then((res) => toast.success("User address updated"))
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
      <div className="col-md-6 ">
        <h4>Delivery Address</h4>
        <form className="m-5 mb-3" onSubmit={handleAddress}>
          <div className="form-group pb-4">
            <label htmlFor="StreetAdress">Street Address</label>
            <input
              type="text"
              className="form-control"
              id="StreetAdress"
              placeholder="Adress"
              onChange={(e) =>
                setAddress({ ...address, streetAddress: e.target.value })
              }
              value={address.streetAddress}
            />
          </div>
          <div className="form-group">
            <label htmlFor="PostalCode">Postal Code</label>
            <input
              type="text"
              className="form-control"
              id="PostalCode"
              placeholder="Postal Code"
              name="PostalCode"
              onChange={(e) =>
                setAddress({ ...address, postalCode: e.target.value })
              }
              value={address.postalCode}
            />
          </div>
          <button
            type="submit"
            className="mt-4 btn btn-primary"
            onSubmit={handleAddress}
          >
            Save
          </button>
        </form>
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
