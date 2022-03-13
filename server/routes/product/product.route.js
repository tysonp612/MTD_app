const express = require("express");
const router = express.Router();

const {
  authTokenCheck,
  adminCheck,
} = require("./../../middlewares/authentication-middleware/authentication.middleware");
