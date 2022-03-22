const Product = require("./../../models/product.schema");
const slugify = require("slugify");

exports.createProduct = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title);
    const product = await new Product(req.body).save();
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(400).send("Create product failed");
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .limit(+req.params.count)
      .populate("category")
      .populate("subcategory")
      .sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(404).send("No product found");
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const slug = req.params.slug;
    await Product.findOneAndDelete({ slug: slug });
    res.status(200).json(null);
  } catch (err) {
    console.log(err);
    res.status(400).send("Delete product failed");
  }
};
