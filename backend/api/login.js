const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.options("*", cors());

mongoose.connect(process.env.MONGODB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
	username: String,
	password: String,
});

const User = mongoose.model("User", userSchema);

app.post("/api/login", async (req, res) => {
	const { username, password } = req.body;

	try {
		// Find the user by username and password
		const user = await User.findOne({ username, password });

		if (!user) {
			return res
				.status(401)
				.json({ message: "Invalid username or password" });
		}

		return res.status(200).json({ message: "Login successful" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
});
