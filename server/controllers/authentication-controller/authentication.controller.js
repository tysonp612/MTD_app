const User = require("./../../models/user");

exports.createOrUpdateUser = async (req, res) => {
  const { name, email, user_id } = req.user;
  try {
    const user = await new User();
  } catch (error) {}

  res.json({ data: "hey from create or update user api" });
};
