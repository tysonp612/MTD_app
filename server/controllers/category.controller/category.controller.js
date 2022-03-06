const Category = require("./../../models/category.schema");
const slugify = require("slugify");

exports.createCategory = async (req, res) => {
  try {
    console.log(req);
  } catch (err) {
    console.log(err);
    res.status(400).send("Create category failed");
  }
};
exports.getAllCategory = async (req, res) => {
  try {
    console.log(req);
  } catch (err) {
    res.status(400);
  }
};
exports.getOneCategory = async (req, res) => {
  try {
    console.log(req);
  } catch (err) {
    res.status(400);
  }
};
exports.updateCategory = async (req, res) => {
  try {
    console.log(req);
  } catch (err) {
    res.status(400);
  }
};
exports.deleteCategory = async (req, res) => {
  try {
    console.log(req);
  } catch (err) {
    res.status(400);
  }
};
