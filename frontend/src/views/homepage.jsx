// Import necessary React and Material-UI components
import React from "react";
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

const transactionsData = [
	{ id: 1, description: "Transaction 1", amount: 100.0 },
	{ id: 2, description: "Transaction 2", amount: -50.0 },
];

const Homepage = () => {
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
