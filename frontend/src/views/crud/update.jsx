import React from "react";
import { Typography, TextField, Button, Container } from "@mui/material";

const Update = () => {
	return (
		<Container>
			<Typography variant="h5" gutterBottom>
				Edit Transaction
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
					Save Changes
				</Button>
			</form>
		</Container>
	);
};

export default Update;
