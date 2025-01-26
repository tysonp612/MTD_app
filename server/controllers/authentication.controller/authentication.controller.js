const User = require("../../models/user.schema");

//Controller to create or update user
exports.createOrUpdateUser = async (req, res) => {
	const { name, email, picture } = req.user;
	try {
		//Check if the user exists and update if found
		let user = await User.findOneAndUpdate(
			{ email },
			{ name, picture },
			{ new: true }
		);
		if (user) {
			return res.status(200).json(user);
		}
		//if no user, create a new user
		user = await new User({
			email,
			name: email.split("@")[0],
			picture,
		});
		await user.save();
		//code 201 for successful creation
		return res.status(201).json(newUser);
	} catch (error) {
		console.error("Error in create or update user");
		return res.status(500).json({ message: "Server error, try again" });
	}
};

exports.adminController = async (req, res) => {
	try {
		return res.status(200).json(true);
	} catch (err) {
		console.error("Error in validating admin:", error);
		return res.status(500).json({ message: "Server error. Please try again." });
	}
};
