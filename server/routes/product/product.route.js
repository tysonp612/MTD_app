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
  .route("/product")
  .post(authTokenCheck, adminCheck, productController.createProduct);
router.route("/products/total").get(productController.productsCount);
router.route("/products/:count").get(productController.getAllProducts);
router
  .route("/product/:slug")
  .delete(authTokenCheck, adminCheck, productController.deleteProduct);
router
  .route("/product/:slug")
  .put(authTokenCheck, adminCheck, productController.updateProduct);
router
  .route("/product/:slug")
  .get(authTokenCheck, adminCheck, productController.getOneProduct);
router.route("/products").post(productController.getSortedProducts);

module.exports = router;
