const User = require("./../../models/user.schema");
const Cart = require("./../../models/cart.schema");
const Product = require("./../../models/product.schema");
const Coupon = require("./../../models/coupon.schema");

//CART
exports.updateCartItems = async (req, res) => {
	try {
		const { cart } = req.body;
		if (!cart || !Array.isArray(cart)) {
			return res.status(400).json({ error: "Invalid cart data" });
		}

		//Find the user based on the email
		const user = await User.findOne({ email: req.user.email });
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		//Find the existing cart belongs to the user
		const existingCart = await Cart.findOne({ orderedBy: user._id });
		//Get any coupon found in the cart
		let couponBeingUsed;
		if (existingCart && existingCart.coupon) {
			couponBeingUsed = await Coupon.findById(existingCart.coupon);
		}

		//Remove existing cart after trieving coupon info
		if (existingCart) {
			await existingCart.remove();
		}

		//make products array from the new cart
		const products = cart.map((item) => {
			return {
				product: item._id,
				cartQuantity: item.cartQuantity,
				color: item.color,
				price: item.price * item.cartQuantity,
			};
		});

		//make cartTotal
		const cartTotal = products
			.map((item) => item.price)
			.reduce((a, b) => a + b, 0);

		//make orderedBy
		const orderedBy = user._id;

		//calculate total after discount
		let totalAfterDiscount;
		let coupon;
		if (couponBeingUsed) {
			const discountAmount = couponBeingUsed.discount;
			totalAfterDiscount = parseFloat(
				(cartTotal - (cartTotal * discountAmount) / 100).toFixed(2)
			);
			coupon = couponBeingUsed._id;
		}

		//Make a new cart with the updated information
		const newCartItems = await Cart.create({
			products,
			coupon,
			cartTotal,
			orderedBy,
			totalAfterDiscount,
		});
		//Update the user cart
		await User.findByIdAndUpdate(user._id, { cart: products });
		res.status(200).json({ ok: true, cart: newCartItems });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "An internal server error occurred" });
	}
};

exports.getCart = async (req, res) => {
	try {
		//Find the user based on email
		const user = await User.findOne({ email: req.user.email });
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		//Note populate, second argument is to keep what we want
		const cart = await Cart.findOne({ orderedBy: user._id })
			.populate("coupon", "expiry name discount")
			.populate("products.product", "_id title price");

		if (!cart) {
			return res.status(404).json({ error: "Cart not found" });
		}
		const totalAfterDiscount = cart.totalAfterDiscount;
		//If there is coupon, check if it is valid
		if (cart.coupon) {
			const coupon = await Coupon.findById(cart.coupon._id);
			if (!coupon) {
				cart.coupon = null;
				totalAfterDiscount = null;
				await cart.save();
			} else {
				//check if coupon has expired
				const now = new Date();
				if (now > coupon.expiry) {
					//Coupon has expired
					cart.coupon = null;
					totalAfterDiscount = null;
					await cart.save();
				} else {
					// Coupon is valid, calculate discount
					const discountAmount = coupon.discount;
					totalAfterDiscount = parseFloat(
						(cart.cartTotal - (cart.cartTotal * discountAmount) / 100).toFixed(
							2
						)
					);
				}
			}
		}
		const { products, cartTotal, coupon } = cart;
		res.status(200).json({ products, cartTotal, totalAfterDiscount, coupon });
	} catch (err) {
		console.error("Error fetching cart:", err);
		res.status(500).json({ error: "An internal server error occurred" });
	}
};

exports.emptyCart = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.user.email });
		const cart = await Cart.findOneAndRemove({ orderedBy: user._id });
		res.status(200).json("cart emptied");
	} catch (err) {
		console.error("Error deleting cart:", err);
		res.status(500).json({ error: "An internal server error occurred" });
	}
};
//ADDRESS
exports.updateAddress = async (req, res) => {
	try {
		const { address } = req.body;
		if (!address) {
			return res.status(400).json({ error: "Address is required" });
		}
		const updatedUser = await User.findOneAndUpdate(
			{ email: req.user.email },
			{ address: address },
			{ new: true }
		);
		console.log(updatedUser);
		if (!updatedUser) {
			return res.status(404).json({ error: "User not found" });
		}

		res.status(200).json({ message: "Address updated" });
	} catch (err) {
		console.error("Error updating address:", err);
		res.status(500).json({ error: "An internal server error occurred" });
	}
};
//COUPON
exports.applyCoupon = async (req, res) => {
	try {
		const { coupon } = req.body;

		const checkCoupon = await Coupon.findOne({ name: coupon });
		if (!checkCoupon) {
			return res.status(400).json({ error: "Invalid coupon code" });
		}
		const date = new Date();
		if (checkCoupon.expiry < date) {
			return res.status(400).json({ error: "Coupon has expired" });
		}
		//check if user has applied the coupon
		const user = await User.findOne({ email: req.user.email });
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const existingCartOfUser = await Cart.findOne({
			orderedBy: user._id,
		});
		const couponId = await Coupon.findOne({ name: coupon });
		const checkCouponUsed = await User.findOne({
			_id: user._id,
			couponUsed: couponId,
		});
		if (checkCouponUsed) {
			return res.status(400).json("This coupon was applied to this account");
		}
		await User.findByIdAndUpdate(user._id, {
			$push: { couponUsed: couponId },
		});
		const newPrice = parseFloat(
			(
				existingCartOfUser.cartTotal -
				(existingCartOfUser.cartTotal * checkCoupon.discount) / 100
			).toFixed(2)
		);

		const newCartWithDiscountedPrice = await Cart.findOneAndUpdate(
			{
				orderedBy: user._id,
			},
			{ totalAfterDiscount: newPrice, coupon: couponId._id },
			{ new: true }
		);
		res.status(200).json(newCartWithDiscountedPrice.totalAfterDiscount);
	} catch (err) {
		console.error("Error applying coupon:", err);
		res.status(500).json({ error: "An internal server error occurred" });
	}
};
//WISHLIST
exports.addToWishList = async (req, res) => {
	try {
		const { productId } = req.body;
		if (!productId) {
			return res.status(400).json({ error: "Product ID is required" });
		}

		const user = await User.findOne({ email: req.user.email });
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const product = await Product.findById(productId);
		if (!product) {
			return res.status(404).json({ error: "Product not found" });
		}

		// Add product to user's wishlist
		await User.findByIdAndUpdate(
			user._id,
			{ $addToSet: { wishList: product._id } }, // Use $addToSet to avoid duplicates
			{ new: true }
		);

		res.status(200).json({ success: true, message: "Added to wish list" });
	} catch (err) {
		console.error("Error adding to wish list:", err);
		res.status(500).json({ error: "An internal server error occurred" });
	}
};
exports.getAllWishList = async (req, res) => {
	try {
		const userWishList = await User.findOne({ email: req.user.email }).populate(
			"wishList",
			"_id title description images slug ratings"
		);

		if (!userWishList) {
			return res.status(404).json({ error: "User not found" });
		}

		res.status(200).json({ success: true, wishList: userWishList.wishList });
	} catch (err) {
		console.error("Error fetching wish list:", err);
		res.status(500).json({ error: "An internal server error occurred" });
	}
};
exports.removeFromWishList = async (req, res) => {
	try {
		const { productId } = req.params;
		if (!productId) {
			return res.status(400).json({ error: "Product ID is required" });
		}

		const user = await User.findOne({ email: req.user.email });
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Remove product from user's wishlist
		await User.findByIdAndUpdate(
			user._id,
			{ $pull: { wishList: productId } },
			{ new: true }
		);

		res.status(200).json({
			success: true,
			message: "Product has been removed from wishlist",
		});
	} catch (err) {
		console.error("Error removing from wish list:", err);
		res.status(500).json({ error: "An internal server error occurred" });
	}
};
