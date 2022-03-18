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
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(404).send("No product found");
  }
};
