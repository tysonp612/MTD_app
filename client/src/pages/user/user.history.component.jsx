import React, { useState, useEffect } from "react";
import UserNav from "./../../components/navigation/user-navigation.component";
import { getOrders } from "./../../utils/order/order.utils";
import { useSelector } from "react-redux";
import { ShowPaymentInfo } from "../../components/card/show-payment-info.component.jsx";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Invoice } from "./../../components/invoice/invoice.component";
import { toast } from "react-toastify";
import { StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";
const History = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    loadOrders();
  }, []);
  const loadOrders = () => {
    getOrders(user.token)
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
  };
  const showDownloadLink = (order) => {
    //NOTE https://stackoverflow.com/questions/63280109/how-to-update-webpack-config-for-a-react-project-created-using-create-react-app
    return (
      <PDFDownloadLink
        fileName="invoice.pdf"
        className="btn btn-sm btnblock btn-outline-primary"
        document={<Invoice order={order} />}
      >
        Download PDF
      </PDFDownloadLink>
    );
  };
  const showOrderInTable = (order) => {
    return (
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Brand</th>
            <th scope="col">Color</th>
            <th scope="col">Quantity</th>
            <th scope="col">Shipping</th>
          </tr>
        </thead>
        <tbody>
          {order.products.map((prod, i) => {
            return (
              <tr key={i}>
                <td>
                  <b>{prod.product.title}</b>
                </td>
                <td>${prod.product.price}</td>
                <td>{prod.product.brand}</td>
                <td>{prod.color}</td>
                <td>{prod.cartQuantity}</td>
                <td>
                  {prod.product.shipping === "Yes" ? (
                    <CheckCircleOutlined style={{ color: "green" }} />
                  ) : (
                    <CloseCircleOutlined style={{ color: "red" }} />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };
  const showEachOrders = () => {
    return orders.map((order, i) => {
      return (
        <div key={i} className="m-5 p-3 card">
          <ShowPaymentInfo order={order} />
          {showOrderInTable(order)}
          <div className="row">
            <div className="col">{showDownloadLink(order)}</div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col-md-10 text-center">
          <h4>
            {orders.length ? "User purchase orders" : "No purchse orders"}
          </h4>
          {showEachOrders()}
        </div>
      </div>
    </div>
  );
};

export default History;
