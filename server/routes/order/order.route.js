const express = require("express");
const {
  authTokenCheck,
} = require("../../middlewares/authentication.middleware/authentication.middleware");
const orderController = require("./../../controllers/order.controller/order.controller");
const router = express.Router();

router
  .route("/order/createOrder")
  .post(authTokenCheck, orderController.updateCartItems);

module.exports = router;
