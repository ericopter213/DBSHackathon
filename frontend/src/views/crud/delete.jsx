import React from "react";
import { Typography, Button, Container } from "@mui/material";

const Delete = () => {
	return (
		<Container>
			<Typography variant="h5" gutterBottom>
				Delete Transaction
			</Typography>
			<Typography variant="body1">
				Are you sure you want to delete this transaction?
			</Typography>
			<Button variant="contained" color="secondary">
				Confirm Delete
			</Button>
		</Container>
	);
};

export default Delete;
