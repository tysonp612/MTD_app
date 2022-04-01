const Product = require("./../../models/product.schema");
const User = require("./../../models/user.schema");
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
exports.getSortedProducts = async (req, res) => {
  //WITHOUT PAGINATION
  // try {
  //   const { sortBy, order, limit } = req.body;
  //   const products = await Product.find()
  //     .populate("category")
  //     .populate("subcategory")
  //     .sort([[sortBy, order]])
  //     .limit(limit);
  //   res.status(200).json(products);
  // } catch (err) {
  //   console.log(err);
  // }

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
    console.log(err);
  }
};
exports.getOneProduct = async (req, res) => {
  try {
    const slug = req.params.slug;
    const product = await Product.findOne({ slug: slug })
      .populate("category")
      .populate("subcategory");
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(404).send("No product found");
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
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(404).send("Update failed");
  }
};
exports.productsCount = async (req, res) => {
  try {
    let total = await Product.find().estimatedDocumentCount();
    res.status(200).json(total);
  } catch (err) {
    console.log(err);
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
exports.productStarRating = async (req, res) => {
  try {
    const id = req.params.productId;
    const product = await Product.findById(id);
    const user = await User.findOne({ email: req.user.email });
    const { star } = req.body;

    //Who is updating?
    //because ratings is an array, we will first find if there is any rating object inside that array which have the postedBy matches the user.id
    let ratingObject = product.ratings.find(
      (obj) =>
        obj.postedBy.valueOf().toString() === user._id.valueOf().toString()
    );

    if (ratingObject === undefined) {
      let ratingAdded = await Product.findByIdAndUpdate(
        id,
        { $push: { ratings: { star: star, postedBy: user._id } } },
        { new: true }
      );
      res.status(200);
    } else {
      let newRating = await Product.updateOne(
        { _id: id, "ratings.postedBy": user._id },
        // { ratings: { $elemMatch: ratingObject } },
        //And I also tried out just modify the `existingRatingObject` and re-save the product record. It seems to work as well.

        // if (rating) {
        // // Update user's rating
        //  rating.star = star;
        //  product = await product.save({ validateBeforeSave: true });
        //  res.status(200).json({product});
        // ......
        {
          $set: { "ratings.$.star": star },
        },
        { new: true }
      );
      res.status(200);
    }
    //Check if currently logged in user have already added rating to this product
  } catch (err) {
    console.log(err);
  }
};
