import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

const Update = () => {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const id = queryParams.get("id");

	const [description, setDescription] = useState("");
	const [amount, setAmount] = useState("");

	const navigate = useNavigate();

	const handleDescriptionChange = (e) => {
		setDescription(e.target.value);
	};

	const handleAmountChange = (e) => {
		setAmount(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.put(
				`${backendUrl}/transactions/${id}`,
				{
					description,
					amount: parseFloat(amount),
				}
			);
			console.log(response)
		} catch (error) {
			// Handle error, show error message to the user
			console.error("Error updating data:", error);
		}
	};

	return (
		<div>
			<CssBaseline />

			<Header />
			<Container style={{ marginTop: "20px" }}>
				<Typography variant="h5" gutterBottom>
					Edit Transaction
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
						Save Changes
					</Button>
				</form>
			</Container>
		</div>
	);
};

export default Update;
