const Product = require("./../../models/product.schema");
const slugify = require("slugify");

exports.createProduct = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const product = await new Product(req.body).save();
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(400).send("Create product failed");
  }
};
