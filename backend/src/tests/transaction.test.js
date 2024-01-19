const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../server"); 
const expect = require("chai").expect;

describe("Transactions API", () => {
	// Clear the database before each test
	beforeEach(async () => {
		await mongoose.connection.dropDatabase();
	});

	describe("POST /addtransaction", () => {
		it("should create a new transaction", async () => {
			const response = await request(app)
				.post("/addtransaction")
				.send({
					description: "Test Transaction",
					amount: 100,
					date: "2024-01-19",
				})
				.expect(201);

			expect(response.body)
				.to.have.property("message")
				.equals("Transaction created successfully");
		});
	});

	describe("GET /transactions", () => {
		it("should get all transactions", async () => {
			// Create a test transaction before fetching all transactions
			await request(app)
				.post("/addtransaction")
				.send({
					description: "Test Transaction",
					amount: 100,
					date: "2024-01-19",
				});

			const response = await request(app)
				.get("/transactions")
				.expect(200);

			expect(response.body).to.be.an("array");
			expect(response.body).to.have.lengthOf(1); // Adjust based on your specific case
		});
	});

	// Add more tests for other endpoints (GET, PUT, DELETE) as needed

	after(async () => {
		// Close the Mongoose connection after running tests
		await mongoose.disconnect();
	});
});
