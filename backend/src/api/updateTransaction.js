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

const transactionSchema = new mongoose.Schema({
	description: String,
	amount: Number,
	date: { type: Date, default: Date.now },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
const User = mongoose.model("User", userSchema);

// Update a transaction by ID
app.put("/transactions/:transactionId", async (req, res) => {
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

module.exports = router;
