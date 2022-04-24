const User = require("./../../models/user.schema");
const Cart = require("./../../models/cart.schema");
const Product = require("./../../models/product.schema");
const Coupon = require("./../../models/coupon.schema");
const Order = require("./../../models/order.schema");

exports.createOrder = async (req, res) => {
  const paymentIntent = req.body.stripeResponse;
  const user = await User.findOne({ email: req.user.email });
  const { products } = await Cart.findOne({ orderedBy: user._id });
  const newOrder = await new Order({
    products,
    paymentIntent,
    orderedBy: user._id,
  }).save();
  console.log(newOrder);
  res.status(200).json({ ok: true });
};
