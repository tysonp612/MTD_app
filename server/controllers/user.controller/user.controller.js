const User = require("./../../models/user.schema");
const Cart = require("./../../models/cart.schema");
const Product = require("./../../models/product.schema");
const Coupon = require("./../../models/coupon.schema");
const { response } = require("express");
exports.updateCartItems = async (req, res) => {
  try {
    const { cart } = req.body;
    const user = await User.findOne({ email: req.user.email });
    const userId = user._id.toString();
    const existingCartOfUser = await Cart.findOne({ orderedBy: user._id });
    if (existingCartOfUser) {
      existingCartOfUser.remove();
    }
    const products = [];
    cart.forEach((item) => {
      let obj = {};
      obj.product = item._id;
      obj.cartQuantity = item.cartQuantity;
      obj.color = item.color;
      obj.price = item.price * item.cartQuantity;

      return products.push(obj);
    });

    const cartTotal = products
      .map((item) => item.price)
      .reduce((a, b) => a + b, 0);

    const orderedBy = user._id;

    const newCartItems = await Cart.create({
      products,
      cartTotal,
      orderedBy,
    });
    await User.findByIdAndUpdate(userId, { cart: products });
    res.status(200).json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

exports.getCart = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    const userId = user._id;
    //Note populate, second argument is to keep what we want
    const cart = await Cart.findOne({ orderedBy: userId }).populate(
      "products.product",
      "_id title price totalAfterDiscount"
    );

    const { products, cartTotal, totalAfterDiscount } = cart;
    res.status(200).json({ products, cartTotal, totalAfterDiscount });
  } catch (err) {
    console.log(err);
  }
};

exports.emptyCart = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    const userId = user._id;
    const cart = await Cart.findOneAndRemove({ orderedBy: userId });
    res.status(200).json("cart emptied");
  } catch (err) {
    console.log(err);
  }
};
exports.updateAddress = async (req, res) => {
  try {
    const { address } = req.body;
    const update = await User.findOneAndUpdate(
      { email: req.user.email },
      { address: address }
    );
    console.log(address);
    res.status(200).json(true);
  } catch (err) {
    console.log(err);
  }
};
exports.applyCoupon = async (req, res) => {
  try {
    const { coupon } = req.body;
    console.log("COUPON:", coupon);
    const checkCoupon = await Coupon.findOne({ name: coupon });
    if (!checkCoupon) {
      res.send("Coupon invalid");
    }
    const date = new Date();
    if (checkCoupon.expiry < date) {
      res.send("Coupon has expiried");
    } else {
      //check if user has applied the coupon
      const user = await User.findOne({ email: req.user.email });
      const existingCartOfUser = await Cart.findOne({
        orderedBy: user._id,
      });
      const couponId = await Coupon.findOne({ name: coupon });
      const checkCouponUsed = await User.findOne({ couponUsed: couponId });
      if (checkCouponUsed) {
        res.status(200).json("This coupon was applied to this account");
      } else {
        const addCouponToUser = await User.findByIdAndUpdate(user._id, {
          $push: { couponUsed: couponId },
        });
        const newPrice = (
          existingCartOfUser.cartTotal -
          (existingCartOfUser.cartTotal * checkCoupon.discount) / 100
        ).toFixed(2);

        const newCartWithDiscountedPrice = await Cart.findOneAndUpdate(
          {
            orderedBy: user._id,
          },
          { totalAfterDiscount: newPrice, coupon: couponId._id },
          { new: true }
        );
        res.status(200).json(newCartWithDiscountedPrice.totalAfterDiscount);
      }
    }
  } catch (err) {
    console.log(err);
  }
};
