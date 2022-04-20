import axios from "axios";
export const getAllCoupons = async (authToken) => {
  await axios.get(`${process.env.REACT_APP_API}/get-coupons`, {
    headers: { authToken },
  });
};
export const removeCoupon = async (authToken, id) => {
  await axios.delete(
    `${process.env.REACT_APP_API}/delete-coupon`,
    { id },
    {
      headers: { authToken },
    }
  );
};
export const createCoupon = async (authToken, coupon) => {
  await axios.post(
    `${process.env.REACT_APP_API}/create-coupon`,
    { coupon },
    {
      headers: { authToken },
    }
  );
};
