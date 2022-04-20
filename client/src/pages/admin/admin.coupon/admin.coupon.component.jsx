import React from "react";
import AdminNav from "./../../../components/navigation/admin-navigation.component";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import {
  getAllCoupons,
  removeCoupon,
  createCoupon,
} from "./../../../utils/coupon/coupon.utils";
import "react-datepicker/dist/react-datepicker.css";
import { DeleteOutlined } from "@ant-design/icons";

export const CouponPage = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">COUPON</div>
      </div>
    </div>
  );
};
