const User = require("../../models/user.schema");
const Cart = require("../../models/cart.schema");
const Product = require("../../models/product.schema");
const Order = require("../../models/order.schema");

exports.createOrder = async (req, res) => {
	const { paymentIntent } = req.body;
	if (!paymentIntent) {
		return res.status(400).json({ error: "Payment information is required" });
	}

	try {
		const user = await User.findOne({ email: req.user.email });
		const cart = await Cart.findOne({ orderedBy: user._id });

		if (!user || cart.products.length === 0) {
			return res.status(400).json({ error: "No products in the cart" });
		}

		//Update product quantities and sold counts:

		//Decrease quantity: The quantity field of the product is decreased by the cartQuantity (the amount the user has in their cart).
		// Increase sold: The sold field is incremented by the cartQuantity, recording the number of items sold.

		for (const prod of cart.products) {
			await Product.findByIdAndUpdate(
				prod.product,
				{
					$inc: { quantity: -prod.cartQuantity, sold: prod.cartQuantity },
				},
				{ new: true }
			);
		}

		// Create new order
		const newOrder = await Order.create({
			products: cart.products,
			paymentIntent,
			orderedBy: user._id,
		});

		res
			.status(201)
			.json({ message: "Order created successfully", order: newOrder });
	} catch (error) {
		console.error("Error creating order:", error);
		res.status(500).json({ error: "Failed to create order" });
	}
};

exports.getOrders = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.user.email });
		const userOrders = await Order.find({ orderedBy: user._id }).populate(
			"products.product"
		);
		res.status(200).json(userOrders);
	} catch (err) {
		console.error("Error retrieving user orders:", err);
		res.status(500).json({ error: "Failed to retrieve orders" });
	}
};

exports.adminUpdateOrders = async (req, res) => {
	const { orderId, update } = req.body;
	if (!orderId || !update) {
		return res
			.status(400)
			.json({ error: "Order ID and update status are required" });
	}

	try {
		const updatedOrder = await Order.findByIdAndUpdate(
			orderId,
			{ orderStatus: update },
			{ new: true }
		);

		if (!updatedOrder) {
			return res.status(404).json({ error: "Order not found" });
		}
		res.status(200).json({
			message: "Order status updated successfully",
			order: updatedOrder,
		});
	} catch (err) {
		console.error("Error updating order status:", err);
		res.status(500).json({ error: "Failed to update order status" });
	}
};

exports.adminGetAllOrders = async (req, res) => {
	try {
		const allOrders = await Order.find({})
			.sort("-createdAt")
			.populate("products.product")
			.populate("orderedBy", "name address");

		res.status(200).json(allOrders);
	} catch (err) {
		console.error("Error retrieving all orders:", err);
		res.status(500).json({ error: "Failed to retrieve all orders" });
	}
};
