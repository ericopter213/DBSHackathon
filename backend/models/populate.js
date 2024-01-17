const mongoose = require("mongoose");
const Transaction = require("./transactions");
const User = require("./users");

mongoose.connect("mongodb://localhost:27017/", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const transactionsData = [
	{ description: "Transaction 1", amount: 100, date: new Date() },
	{ description: "Transaction 2", amount: 200, date: new Date() },
];

const userData = [
	{ username: "admin", password: "admin", accessLevel: 1 },
	{ username: "user", password: "password", accessLevel: 0 },
];

// Populate the collection
async function populateData() {
	try {
		// Clear existing data
		await Transaction.deleteMany({});
		await User.deleteMany({});

		// Insert new data
		await Transaction.insertMany(transactionsData);
		await User.insertMany(userData);

		console.log("Data populated successfully");
	} catch (error) {
		console.error("Error populating data:", error);
	} finally {
		mongoose.disconnect();
	}
}

populateData();
