const User = require("./../../models/user.schema");

exports.updateCartItems = async (req, res) => {
  try {
    const { cart } = req.body;
    // const updatedCart = await User.findByIdAndUpdate(
    //   { userId },
    //   { cart: cart },
    //   { new: true }
    // );
    console.log(cart);
    // res.status(200).json(updatedCart);
  } catch (err) {
    console.log(err);
  }
};
