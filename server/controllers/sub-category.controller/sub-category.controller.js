const SubCategory = require("../../models/sub-category.schema");
const slugify = require("slugify");
exports.createSubCategory = async (req, res) => {
	try {
		const { name, parent } = req.body;
		if (!name || !parent) {
			return res
				.status(400)
				.json({ error: "Name and parent category are required" });
		}
		const subCategory = await new SubCategory({
			name: name,
			parent: parent,
			slug: slugify(name),
		}).save();
		res.status(200).json(subCategory);
	} catch (err) {
		console.error("Error creating subcategory:", err);
		res.status(500).json({ error: "Failed to create subcategory" });
	}
};
exports.getAllSubCategory = async (req, res) => {
	try {
		const subCategories = await SubCategory.find().sort({ createdAt: -1 });
		res.status(200).json(subCategories);
	} catch (err) {
		console.error("Error retrieving subcategories:", err);
		res.status(500).json({ error: "Failed to retrieve subcategories" });
	}
};
exports.getOneSubCategory = async (req, res) => {
	const slug = req.params.slug;
	try {
		const oneSubCategory = await SubCategory.findOne({ slug: slug });
		if (!subCategory) {
			return res.status(404).json({ error: "Subcategory not found" });
		}
		res.status(200).json(subCategory);
	} catch (err) {
		console.error("Error retrieving subcategory:", err);
		res.status(500).json({ error: "Failed to retrieve subcategory" });
	}
};
exports.updateSubCategory = async (req, res) => {
	const { slug } = req.params;
	const { name, parent } = req.body;
	try {
		const updatedSubCategory = await SubCategory.findOneAndUpdate(
			{ slug },
			{ name, slug: slugify(name), parent },
			{ new: true }
		);
		if (!updatedSubCategory) {
			return res.status(404).json({ error: "Subcategory not found" });
		}
		res.status(200).json(updatedSubCategory);
	} catch (err) {
		console.error("Error updating subcategory:", err);
		res.status(500).json({ error: "Failed to update subcategory" });
	}
};
exports.deleteSubCategory = async (req, res) => {
	try {
		const slug = req.params.slug;
		const deleteSubCategory = await SubCategory.findOneAndDelete({ slug });
		if (!deletedSubCategory) {
			return res.status(404).json({ error: "Subcategory not found" });
		}
		res.status(200).json({ message: "Subcategory deleted successfully" });
	} catch (err) {
		console.error("Error deleting subcategory:", err);
		res.status(500).json({ error: "Failed to delete subcategory" });
	}
};
