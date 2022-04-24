import React, { useState, useEffect } from "react";
import UserNav from "./../../components/navigation/user-navigation.component";
import { getOrders } from "./../../utils/order/order.utils";
import { useSelector } from "react-redux";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
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
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col-md-10">User History Page</div>
      </div>
    </div>
  );
};

export default History;
