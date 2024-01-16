import React from "react";
import { Typography, Container, Button } from "@mui/material";

const sampleTransaction = {
	id: 1,
	description: "Sample Transaction",
	amount: 75.5,
};

const Read = () => {
	return (
		<Container>
			<Typography variant="h5" gutterBottom>
				Transaction Details
			</Typography>
			<Typography variant="body1">
				<strong>ID:</strong> {sampleTransaction.id}
			</Typography>
			<Typography variant="body1">
				<strong>Description:</strong> {sampleTransaction.description}
			</Typography>
			<Typography variant="body1">
				<strong>Amount:</strong> {sampleTransaction.amount}
			</Typography>
			<Button variant="outlined" color="primary">
				Back to Transactions List
			</Button>
		</Container>
	);
};

export default Read;
