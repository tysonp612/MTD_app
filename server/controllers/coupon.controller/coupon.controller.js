const Coupon = require("./../../models/coupon.schema");
exports.createCoupon = async (req, res) => {
  const { name, expiry, discount } = req.body;
  const coupon = await Coupon.create({ name, expiry, discount });
  res.status(200).json(coupon);
};

exports.getAllCoupons = async (req, res) => {
  const coupons = await Coupon.find();
  res.status(200).json(coupons);
};
exports.deleteCoupon = async (req, res) => {
  const { id } = req.body;
  const coupons = await Coupon.findByIdAndDelete({ id });
  res.status(200).json(null);
};
