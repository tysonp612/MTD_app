const express = require("express");
const authController = require("../../controllers/authentication-controller/authentication.controller");
const router = express.Router();
const authTokenCheck = require("./../../middlewares/authentication-middleware/authentication.middleware");
router
  .route("/create-or-update-user")
  .post(authTokenCheck, authController.createOrUpdateUser);

module.exports = router;
