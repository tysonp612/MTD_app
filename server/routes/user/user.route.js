const express = require("express");
const {
  authTokenCheck,
} = require("../../middlewares/authentication.middleware/authentication.middleware");
const userController = require("./../../controllers/user.controller/user.controller");
const router = express.Router();

router
  .route("/user/addToCart")
  .put(authTokenCheck, userController.updateCartItems);

module.exports = router;
