import React from "react";
import { Typography, TextField, Button, Container } from "@mui/material";

const Create = () => {
	return (
		<Container>
			<Typography variant="h5" gutterBottom>
				Add New Transaction
			</Typography>
			<form>
				<TextField
					label="Description"
					fullWidth
					margin="normal"
					required
				/>
				<TextField
					label="Amount"
					type="number"
					fullWidth
					margin="normal"
					required
				/>
				<Button type="submit" variant="contained" color="primary">
					Add Transaction
				</Button>
			</form>
		</Container>
	);
};

export default Create;
