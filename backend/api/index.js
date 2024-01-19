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

app.get("/", (req, res) => {
	res.send("Hello World");
});

mongoose.connect(process.env.MONGODB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
	username: String,
	password: String,
});

const transactionSchema = new mongoose.Schema({
	description: String,
	amount: Number,
	date: { type: Date, default: Date.now },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
const User = mongoose.model("User", userSchema);

// Routes
app.post("/api/signup", async (req, res) => {
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

// Create a new transaction
app.post("/api/addtransaction", async (req, res) => {
	const { description, amount, date } = req.body;

	try {
		const newTransaction = new Transaction({ description, amount, date });
		await newTransaction.save();

		return res
			.status(201)
			.json({ message: "Transaction created successfully" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
});

// Get all transactions
app.get("/api/transactions", async (req, res) => {
	try {
		const transactions = await Transaction.find();
		return res.status(200).json(transactions);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
});

// Get a specific transaction by ID
app.get("/api/transactions/:transactionId", async (req, res) => {
	const transactionId = req.params.transactionId;
	try {
		const transaction = await Transaction.findById(transactionId);

		if (!transaction) {
			return res.status(404).json({ message: "Transaction not found" });
		}

		return res.status(200).json(transaction);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
});

// Update a transaction by ID
app.put("/api/transactions/:transactionId", async (req, res) => {
	const transactionId = req.params.transactionId;

	const { description, amount, date } = req.body;

	try {
		const updatedTransaction = await Transaction.findByIdAndUpdate(
			transactionId,
			{ description, amount, date },
			{ new: true }
		);

		if (!updatedTransaction) {
			return res.status(404).json({ message: "Transaction not found" });
		}

		return res.status(200).json(updatedTransaction);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
});

// Delete a transaction by ID
app.delete("/api/transactions/:transactionId", async (req, res) => {
	const transactionId = req.params.transactionId;

	try {
		const deletedTransaction = await Transaction.findByIdAndDelete(
			transactionId
		);

		if (!deletedTransaction) {
			return res.status(404).json({ message: "Transaction not found" });
		}

		return res
			.status(200)
			.json({ message: "Transaction deleted successfully" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
});

// Start the server
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});

app.get("/test", (req, res) => {
	res.send("test success");
});

const allowCors = (fn) => async (req, res) => {
	res.setHeader("Access-Control-Allow-Credentials", true);
	res.setHeader("Access-Control-Allow-Origin", "*");
	// another common pattern
	// res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET,OPTIONS,PATCH,DELETE,POST,PUT"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
	);
	if (req.method === "OPTIONS") {
		res.status(200).end();
		return;
	}
	return await fn(req, res);
};

module.exports = allowCors(app);
