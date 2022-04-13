import React from "react";
import { useSelector } from "react-redux";
import productsDefaultImages from "./../../components/images/techdevices.jpeg";
export const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
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
                    <td>Otto</td>
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
