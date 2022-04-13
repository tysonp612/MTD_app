import React from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import productsDefaultImages from "./../../components/images/techdevices.jpeg";
export const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const handleIncrease = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
    if (item.cartQuantity === item.quantity) {
      toast.error(`Maximum available quantity: ${item.quantity}`);
    }
  };
  const handleDecrease = (item) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          <h4 className="p-3">Cart/ Products</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Brand</th>
                <th>Color</th>
                <th>Count</th>
                <th>Shipping</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => {
                return (
                  <tr key={item._id}>
                    <th>
                      <img
                        width="130"
                        height="130"
                        src={`${
                          item.images.length
                            ? item.images[0].url
                            : productsDefaultImages
                        }`}
                      />
                    </th>
                    <td>{item.title}</td>
                    <td>${item.price}</td>
                    <td>{item.brand}</td>
                    <td>{item.color}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div
                          onClick={() => {
                            handleDecrease(item);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          &lt;
                        </div>
                        <div className="p-1">{item.cartQuantity}</div>
                        <div
                          onClick={() => {
                            handleIncrease(item);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          &gt;
                        </div>
                      </div>
                    </td>
                    <td>{item.shipping}</td>
                    <td>X</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="col-md-4">Order Summary/</div>
      </div>
    </div>
  );
};
