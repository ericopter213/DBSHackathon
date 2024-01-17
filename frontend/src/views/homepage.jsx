// Import necessary React and Material-UI components
import React, { useState, useEffect } from "react";
import {
	Typography,
	CssBaseline,
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@mui/material";

import Header from "../components/header";

const Homepage = () => {
	const [transactionsData, setTransactionsData] = useState([]);

	// Fetch data from Express backend when the component mounts
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					"http://localhost:9000/transactions"
				);
				const data = await response.json();

				// Assuming the data is an array of transactions
				setTransactionsData(data);
			} catch (error) {
				console.error("Error fetching transactions:", error);
			}
		};

		fetchData();
	}, []);
	return (
		<div>
			<CssBaseline />

			<Header />

			<Typography variant="h5" gutterBottom>
				Transactions List
			</Typography>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>Description</TableCell>
							<TableCell>Amount</TableCell>
							<TableCell>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{transactionsData.map((transaction) => (
							<TableRow key={transaction.id}>
								<TableCell>{transaction.id}</TableCell>
								<TableCell>{transaction.description}</TableCell>
								<TableCell>{transaction.amount}</TableCell>
								<TableCell>
									{/* Add buttons for update and delete actions */}
									<Button variant="outlined" color="primary">
										Edit
									</Button>
									<Button
										variant="outlined"
										color="secondary">
										Delete
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default Homepage;
