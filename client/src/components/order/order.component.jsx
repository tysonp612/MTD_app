import React from "react";
// import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design.icons";
import { ShowPaymentInfo } from "./../card/show-payment-info.component";
export const OrderComponent = ({ orders, handleStatusChange }) => {
  return (
    <>
      {orders.map((order) => {
        return (
          <div key={order._id} className="row pb-5">
            <div className="btn btn-block bg-light">
              <ShowPaymentInfo order={order} />
              <div className="row">
                <div className="col-md-4">Delivery Status</div>
                <div className="col-md-8">
                  <select
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="form-control"
                    dafaultValue={order.orderStatus}
                  >
                    <option value="Not Processed">Not Processed</option>
                    <option value="Processing">Processing</option>
                    <option value="Dispatched">Dispatched</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
