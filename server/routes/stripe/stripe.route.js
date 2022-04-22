const express = require("express");
const router = express.Router();

const stripeController = require("./../../controllers/stripe.controller/stripe.controller");
//middleware
const authTokenCheck = require("./../../controllers/authentication.controller/authentication.controller");

router
  .route("/create-payment-intent")
  .post(authTokenCheck, stripeController.createPaymentIntent);
module.exports = router;
