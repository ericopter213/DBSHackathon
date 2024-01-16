import React, { useState } from "react";
import {
	Typography,
	TextField,
	Button,
	Container,
	CssBaseline,
} from "@mui/material";
import Header from "../../components/header";
import axios from "axios";

const backendUrl = "http://localhost:9000";

const Create = () => {
	const [description, setDescription] = useState("");
	const [amount, setAmount] = useState("");

	const handleDescriptionChange = (event) => {
		setDescription(event.target.value);
	};

	const handleAmountChange = (event) => {
		setAmount(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await axios.post(
				`${backendUrl}/addtransaction`,
				{
					description,
					amount: parseFloat(amount), // Ensure amount is converted to a number
				}
			);

			console.log("Transaction added successfully:", response.data);

			setDescription("");
			setAmount("");
		} catch (error) {
			console.error("Error adding transaction:", error);

		}
	};

	return (
		<div>
			<CssBaseline />

			<Header />

			<Container style={{ marginTop: "20px" }}>
				<Typography variant="h5" gutterBottom>
					Add New Transaction
				</Typography>
				<form onSubmit={handleSubmit}>
					<TextField
						label="Description"
						fullWidth
						margin="normal"
						required
						value={description}
						onChange={handleDescriptionChange}
					/>
					<TextField
						label="Amount"
						type="number"
						fullWidth
						margin="normal"
						required
						value={amount}
						onChange={handleAmountChange}
					/>
					<Button type="submit" variant="contained" color="primary">
						Add Transaction
					</Button>
				</form>
			</Container>
		</div>
	);
};

export default Create;
