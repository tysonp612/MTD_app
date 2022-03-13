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
module.exports = router;
