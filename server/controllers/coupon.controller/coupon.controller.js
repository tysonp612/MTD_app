const Coupon = require("./../../models/coupon.schema");

exports.createCoupon = async (req, res) => {
	const { name, expiry, discount } = req.body.coupon || {};
	//validate data
	if (!name || !expiry || !discount) {
		return res.status(400).json({
			error: "All coupon fields (name, expiry, discount) are required",
		});
	}
	try {
		const coupon = await Coupon.create({ name, expiry, discount });
		res.status(201).json(coupon);
	} catch (err) {
		console.error("Error creating coupon:", err);
		res.status(500).json({ error: "Failed to create coupon" });
	}
};

exports.getAllCoupons = async (req, res) => {
	try {
		const coupons = await Coupon.find().sort({ createdAt: -1 });
		res.status(200).json(coupons);
	} catch (err) {
		console.error("Error retrieving coupons:", err);
		res.status(500).json({ error: "Failed to retrieve coupons" });
	}
};

exports.deleteCoupon = async (req, res) => {
	const { id } = req.params;

	if (!id) {
		return res.status(400).json({ error: "Coupon ID is required" });
	}

	try {
		const coupon = await Coupon.findByIdAndDelete(id);

		if (!coupon) {
			return res.status(404).json({ error: "Coupon not found" });
		}

		res.status(200).json({ message: "Coupon deleted successfully" });
	} catch (err) {
		console.error("Error deleting coupon:", err);
		res.status(500).json({ error: "Failed to delete coupon" });
	}
};
