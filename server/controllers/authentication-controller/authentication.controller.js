const User = require("./../../models/user");

exports.createOrUpdateUser = async (req, res) => {
  const { name, email, picture } = req.user;
  try {
    //if there is already user in db, update new with req.user from checkToken middleware
    const user = await User.findOneAndUpdate(
      { email },
      { name, picture },
      { new: true }
    );
    if (user) {
      console.log("USER UPDATED", user);
      res.json(user);
    } else {
      //if no user found, create new user with schema
      const newUser = await new User({ email, name, picture }).save();
      console.log("USER CREATED", newUser);
      res.json({ data: newUser });
    }
  } catch (error) {
    console.log(error);
  }
};
