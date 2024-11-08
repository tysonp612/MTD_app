const Product = require("./../../models/product.schema");
const cloudinary = require("cloudinary");

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});
exports.uploadImages = async (req, res) => {
	const { images } = req.body;
	if (!images) {
		return res.status(400).json({ error: "No images provided!" });
	}

	try {
		let result = await cloudinary.uploader.upload(images, {
			public_id: `${Date.now()}`,
			resource_type: "auto",
		});
		res.status(200).json({
			public_id: result.public_id,
			url: result.secure_url,
		});
	} catch (error) {
		console.error("Error uploading image:", err);
		res.status(500).json({ error: "Failed to upload image" });
	}
};
exports.removeImages = async (req, res) => {
	const { public_id: imageId } = req.body;
	// Check if image ID is provided
	if (!imageId) {
		return res.status(400).json({ error: "No image ID provided" });
	}

	try {
		await cloudinary.uploader.destroy(imageId);
		res.status(200).json({ message: "Image deleted successfully" });
	} catch (err) {
		console.error("Error deleting image:", err);
		res.status(500).json({ error: "Failed to delete image" });
	}
};
