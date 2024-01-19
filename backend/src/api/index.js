
const express = require("express");

const login = require("./login");
const signup = require("./signup");
const createTransaction = require("./createTransaction");
const readTransaction = require("./readTransaction");
const updateTransaction = require("./updateTransaction");
const deleteTransaction = require("./deleteTransaction");
const allTransactions = require("./allTransactions");

const router = express.Router();

router.get("/", (req, res) => {
	res.json({
		message: "Hello World",
	});
});

router.use("/login", login);
router.use("/signup", signup);
router.use("/createTransaction", createTransaction);
router.use("/readTransaction", readTransaction);
router.use("/updateTransaction", updateTransaction);
router.use("/deleteTransaction", deleteTransaction);
router.use("/allTransactions", allTransactions);

module.exports = router;
 