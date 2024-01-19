const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
	username: String,
	password: String,
});

const User = mongoose.model("User", userSchema);

// Routes
app.post("/signup", async (req, res) => {
	const { username, password } = req.body;

	try {
		// Check if the username already exists
		const existingUser = await User.findOne({ username });

		if (existingUser) {
			return res.status(409).json({ message: "Username already exists" });
		}

		// Create a new user
		const newUser = new User({ username, password });
		await newUser.save();

		return res
			.status(201)
			.json({ message: "User registered successfully" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
});

module.exports = router;
