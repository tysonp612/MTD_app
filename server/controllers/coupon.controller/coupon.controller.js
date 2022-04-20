const Coupon = require("./../../models/coupon.schema");
exports.createCoupon = async (req, res) => {
  try {
    const { name, expiry, discount } = req.body;
    const coupon = await Coupon.create({ name, expiry, discount });
    res.status(200).json(coupon);
  } catch (err) {
    console.log(err);
  }
};

exports.getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.status(200).json(coupons);
  } catch (err) {
    console.log(err);
  }
};
exports.deleteCoupon = async (req, res) => {
  try {
    const { id } = req.body;
    const coupons = await Coupon.findByIdAndDelete({ id });
    res.status(200).json(null);
  } catch (err) {
    console.log(err);
  }
};
