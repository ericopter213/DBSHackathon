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

// Get all transactions
router.get("/transactions", async (req, res) => {
	try {
		const transactions = await Transaction.find();
		return res.status(200).json(transactions);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
});

module.exports = router;
