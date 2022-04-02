const express = require("express");
const router = express.Router();
const productController = require("./../../controllers/product.controller/product.controller");
//middlewares
const {
  authTokenCheck,
  adminCheck,
} = require("./../../middlewares/authentication.middleware/authentication.middleware");

//routes
router
  .route("/product/star/:productId")
  .put(authTokenCheck, productController.productStarRating);
router
  .route("/product")
  .post(authTokenCheck, adminCheck, productController.createProduct);
router.route("/products/total").get(productController.productsCount);
router
  .route("/products/related/total")
  .post(productController.productsCountRelated);

router
  .route("/products/from-category/:slug")
  .get(productController.getAllProductFromCategory);
router.route("/products/:count").get(productController.getAllProducts);

router
  .route("/product/:slug")
  .delete(authTokenCheck, adminCheck, productController.deleteProduct);
router
  .route("/product/:slug")
  .put(authTokenCheck, adminCheck, productController.updateProduct);
router.route("/product/:slug").get(productController.getOneProduct);
router.route("/products").post(productController.getSortedProducts);
router
  .route("/products/related/:slug")
  .post(productController.getRelatedProducts);

module.exports = router;
