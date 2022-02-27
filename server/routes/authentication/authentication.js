const express = require("express");
const authenticationController = require("./../../controllers/authentication/authenticationController");
const router = express.Router();

router
  .route("/create-or-update-user")
  .get(authenticationController.createOrUpdateUser);

module.exports = router;
