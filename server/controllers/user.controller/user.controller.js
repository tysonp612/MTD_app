const User = require("./../../models/user.schema");
const Cart = require("./../../models/cart.schema");
const Product = require("./../../models/product.schema");
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
    console.log(newCartItems);

    res.status(200).json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

exports.getCart = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    const userId = user._id;
    //Note populate
    const cart = await Cart.findOne({ orderedBy: userId }).populate(
      "products.product"
    );
    console.log(cart);
    // const { products, cartTotal, totalAfterDiscount } = cart;
    // res.json({ product, cartTotal, totalAfterDiscount });
    res.status(200).json(cart);
  } catch (err) {
    console.log(err);
  }
};
