const Product = require("./../../models/product.schema");
const User = require("./../../models/user.schema");
const Category = require("./../../models/category.schema");
const SubCategory = require("./../../models/sub-category.schema");
const slugify = require("slugify");

exports.createProduct = async (req, res) => {
	try {
		req.body.slug = slugify(req.body.title);
		const product = await new Product(req.body).save();
		res.status(200).json(product);
	} catch (err) {
		console.error("Error creating product:", err);
		res.status(400).json({ error: "Failed to create product" });
	}
};

exports.getAllProductFromCategory = async (req, res) => {
	try {
		const { slug } = req.params;

		const category = await Category.findOne({ slug });
		if (!category) return res.status(404).json({ error: "Category not found" });

		const products = await Product.find({ category: category._id })
			.populate("category")
			.populate("subcategory");
		res.status(200).json(products);
	} catch (err) {
		console.error("Error retrieving products by category:", err);
		res.status(404).json({ error: "No products found" });
	}
};
exports.getAllProductFromSubCategory = async (req, res) => {
	try {
		const { slug } = req.params;

		const subCategory = await SubCategory.findOne({ slug });
		if (!subCategory)
			return res.status(404).json({ error: "Subcategory not found" });

		const products = await Product.find({ subcategory: subCategory._id })
			.populate("category")
			.populate("subcategory");
		res.status(200).json(products);
	} catch (err) {
		console.error("Error retrieving products by subcategory:", err);
		res.status(404).json({ error: "No products found" });
	}
};
//get all products with pagination
//page: retrieve from params, defaults to 1
//limit: retrieve from params, defaults to 10, setting the number of produts to show per page
exports.getAllProductsWithPagination = async (req, res) => {
	try {
		const page = req.body.page || 1;
		const limit = parseInt(req.params.count) || 10;

		//Calculates the number of products to skip based on the current page and limit.
		//For example, if page = 2 and limit = 10, it skips (2 - 1) * 10 = 10 products, retrieving the next set of products for page 2.
		const products = await Product.find()
			.skip((page - 1) * limit)
			.limit(limit)
			.populate("category")
			.populate("subcategory")
			.sort({ createdAt: -1 });

		res.status(200).json(products);
	} catch (err) {
		console.error("Error retrieving paginated products:", err);
		res.status(404).json({ error: "No products found" });
	}
};
//Note this
exports.getRelatedProducts = async (req, res) => {
	try {
		const { page, categoryId } = req.body;
		const currentPage = page || 1;
		const documentPerPage = 3;
		const { slug } = req.params;

		const allRelatedProducts = await Product.find({ category: categoryId })
			.skip((currentPage - 1) * documentPerPage)
			.populate("category")
			.populate("subcategory")
			.limit(documentPerPage);

		const relatedProducts = allRelatedProducts.filter(
			(product) => product.slug !== slug
		);

		res.status(200).json(relatedProducts);
	} catch (err) {
		console.error("Error retrieving related products:", err);
		res.status(500).json({ error: "Failed to retrieve related products" });
	}
};

exports.productsCountRelated = async (req, res) => {
	try {
		const { categoryId } = req.body;
		const totalProducts = await Product.countDocuments({
			category: categoryId,
		});
		res.status(200).json(totalProducts);
	} catch (err) {
		console.error("Error counting products by category:", err);
		res.status(500).json({ error: "Failed to count products" });
	}
};

exports.getSortedProducts = async (req, res) => {
	//WITH PAGINATION
	try {
		const { sortBy, order, page } = req.body;
		const currentPage = page || 1;
		const documentPerPage = 3;
		const products = await Product.find()
			.skip((currentPage - 1) * documentPerPage)
			.populate("category")
			.populate("subcategory")
			.sort([[sortBy, order]])
			.limit(documentPerPage);
		res.status(200).json(products);
	} catch (err) {
		console.error("Error retrieving sorted products:", err);
		res.status(500).json({ error: "Failed to retrieve sorted products" });
	}
};
exports.getOneProduct = async (req, res) => {
	try {
		const slug = req.params.slug;
		const product = await Product.findOne({ slug: slug })
			.populate("category")
			.populate("subcategory");
		if (!product) return res.status(404).json({ error: "Product not found" });
		res.status(200).json(product);
	} catch (err) {
		console.error("Error retrieving product:", err);
		res.status(500).json({ error: "Failed to retrieve product" });
	}
};

exports.updateProduct = async (req, res) => {
	try {
		const slug = req.params.slug;
		const product = await Product.findOneAndUpdate(
			{ slug: slug },
			req.body.values,
			{
				new: true,
			}
		);
		if (!product) return res.status(404).json({ error: "Product not found" });

		res.status(200).json(product);
	} catch (err) {
		console.error("Error updating product:", err);
		res.status(500).json({ error: "Failed to update product" });
	}
};
exports.productsCount = async (req, res) => {
	try {
		let total = await Product.find().estimatedDocumentCount();
		res.status(200).json(total);
	} catch (err) {
		console.error("Error counting products:", err);
		res.status(500).json({ error: "Failed to count products" });
	}
};

exports.deleteProduct = async (req, res) => {
	try {
		const slug = req.params.slug;
		await Product.findOneAndDelete({ slug: slug });
		if (!product) return res.status(404).json({ error: "Product not found" });

		res.status(200).json({ message: "Product deleted successfully" });
	} catch (err) {
		console.error("Error deleting product:", err);
		res.status(500).json({ error: "Failed to delete product" });
	}
};
exports.productStarRating = async (req, res) => {
	try {
		const { productId } = req.params;
		const { star } = req.body;
		const product = await Product.findById(productId);
		const user = await User.findOne({ email: req.user.email });
		if (!product) return res.status(404).json({ error: "Product not found" });

		//find object inside that array which have the postedBy matches the user.id
		let ratingObject = product.ratings.find(
			(obj) =>
				obj.postedBy.valueOf().toString() === user._id.valueOf().toString()
		);

		if (!ratingObject) {
			await Product.findByIdAndUpdate(
				productId,
				{ $push: { ratings: { star, postedBy: user._id } } },
				{ new: true }
			);
		} else {
			await Product.updateOne(
				{ _id: productId, "ratings.postedBy": user._id },
				{ $set: { "ratings.$.star": star } },
				{ new: true }
			);
		}

		res.status(200).json({ message: "Rating submitted successfully" });

		//Check if currently logged in user have already added rating to this product
	} catch (err) {
		console.error("Error rating product:", err);
		res.status(500).json({ error: "Failed to submit rating" });
	}
};
//SEARCH/FILTER
// const handleQuery = async (req, res, query) => {
//   try {
//     const products = await Product.find({ $text: { $search: query } })
//       .populate("category", "_id name")
//       .populate("subcategory", "_id name")
//       .populate("ratings.postedBy", "_id name");
//     res.status(200).json(products);
//   } catch (err) {
//     console.log(err);
//   }
// };
// exports.getProductsByFilters = async (req, res) => {
//   const { query } = req.body;
//   console.log(query);
//   if (query) {
//     console.log("query", query);
//     await handleQuery(req, res, query);
//   }
// };
//Note
exports.getProductsByAveRating = async (req, res) => {
	try {
		const ratings = await Product.aggregate([
			{ $unwind: "$ratings" },
			{
				$group: { _id: "$slug", avgRating: { $avg: "$ratings.star" } },
			},
		]);

		res.status(200).json(ratings);
	} catch (err) {
		console.error("Error retrieving average ratings:", err);
		res.status(500).json({ error: "Failed to retrieve ratings" });
	}
};
