const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      default: "subcriber",
    },
    cart: {
      type: Array,
      default: [],
    },
    address: {
      type: String,
    },
    //   wishList: [{ type: ObjectID, ref:"Product" }]
  },
  //timestamps true will update time automatically so we dont have to create createdAt
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
