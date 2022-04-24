const User = require("../../models/user.schema");
const Cart = require("../../models/cart.schema");
const Product = require("../../models/product.schema");
const Coupon = require("../../models/coupon.schema");
const Order = require("../../models/order.schema");

exports.createOrder = async (req, res) => {
  try {
    const { paymentIntent } = req.body;
    const user = await User.findOne({ email: req.user.email });
    const { products } = await Cart.findOne({ orderedBy: user._id });
    console.log(products);
    products.forEach(async (prod) => {
      const updatedProduct = await Product.findByIdAndUpdate(
        prod.product,
        {
          $inc: { quantity: -prod.cartQuantity, sold: prod.cartQuantity },
        },
        { new: true }
      );
    });
    const newOrder = await new Order({
      products,
      paymentIntent,
      orderedBy: user._id,
    }).save();
    res.status(200).json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};
