const Category = require("./../../models/category.schema");
const SubCategory = require("./../../models/sub-category.schema");
const slugify = require("slugify");

exports.createCategory = async (req, res) => {
	try {
		const { name } = req.body;
		const category = await new Category({
			name: name,
			slug: slugify(name),
		}).save();
		res.status(201).json(category);
	} catch (error) {
		console.error("Error creating category:", error);
		res.status(400).json({ message: "Create category failed." });
	}
};
exports.getAllCategory = async (req, res) => {
	try {
		const categories = await Category.find().sort({ createdAt: -1 });
		res.status(200).json(categories);
	} catch (error) {
		console.error("Error fetching categories:", error);
		res.status(500).json({ message: "Failed to retrieve categories." });
	}
};
exports.getOneCategory = async (req, res) => {
	const { slug } = req.params;
	try {
		const category = await Category.findOne({ slug });
		if (!category) {
			return res.status(404).json({ message: "Category not found." });
		}
		res.status(200).json(category);
	} catch (error) {
		console.error("Error fetching category:", error);
		res.status(500).json({ message: "Failed to retrieve category." });
	}
};
exports.updateCategory = async (req, res) => {
	const { slug } = req.params;
	const { name } = req.body;
	try {
		const updatedCategory = await Category.findOneAndUpdate(
			{ slug },
			{ name, slug: slugify(name) },
			{ new: true }
		);
		if (!updatedCategory) {
			return res.status(404).json({ message: "Category not found." });
		}
		res.status(200).json(oneCategory);
	} catch (error) {
		console.error("Error updating category:", error);
		res.status(400).json({ message: "Update category failed." });
	}
};
exports.deleteCategory = async (req, res) => {
	try {
		const { slug } = req.params;
		const deletedCategory = await Category.findOneAndDelete({ slug });
		if (!deletedCategory) {
			return res.status(404).json({ message: "Category not found." });
		}
		res.status(204).send(); // 204 No Content for successful deletion
	} catch (error) {
		console.error("Error deleting category:", error);
		res.status(400).json({ message: "Delete category failed." });
	}
};

//THIS WILL BE MOVED TO SUB-CATEGORY CONTROLLER!!!
exports.getSubFromCategoryId = async (req, res) => {
	try {
		const subCategories = await SubCategory.find({ parent: req.params.id });
		res.status(200).json(subCategories);
	} catch (err) {
		console.log(err);
		res
			.status(400)
			.send("Could not find subcategory matches with provided category");
	}
};
