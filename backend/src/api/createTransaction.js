const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const transactionSchema = new mongoose.Schema({
	description: String,
	amount: Number,
	date: { type: Date, default: Date.now },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

// Create a new transaction
router.post("/addtransaction", async (req, res) => {
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

module.exports = router;
