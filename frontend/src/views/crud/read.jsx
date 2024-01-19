import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Typography, Container, Button, CssBaseline } from "@mui/material";
import Header from "../../components/header";
import axios from "axios";

const backendUrl = `${process.env.REACT_APP_BACKEND_URL}`;

const Read = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const queryParams = new URLSearchParams(location.search);
	const id = queryParams.get("id");

	const [transaction, setTransaction] = useState(null);

	useEffect(() => {
		const fetchTransaction = async () => {
			try {
				const response = await axios.get(
					`${backendUrl}/transactions/${id}`
				);

				setTransaction(response.data);
			} catch (error) {
				console.error("Error fetching transaction:", error);
			}
		};

		fetchTransaction();
	}, [id]);

	return (
		<div>
			<CssBaseline />

			<Header />

			<Container style={{ marginTop: "20px" }}>
				<Typography variant="h5" gutterBottom>
					Transaction Details
				</Typography>
				{transaction ? (
					<>
						<Typography variant="body1">
							<strong>ID:</strong> {transaction.id}
						</Typography>
						<Typography variant="body1">
							<strong>Description:</strong>{" "}
							{transaction.description}
						</Typography>
						<Typography variant="body1">
							<strong>Amount:</strong> {transaction.amount}
						</Typography>
					</>
				) : (
					<Typography variant="body1">Loading...</Typography>
				)}
				<Button
					variant="outlined"
					color="primary"
					onClick={() => navigate("/homepage")}>
					Back to Transactions List
				</Button>
			</Container>
		</div>
	);
};

export default Read;
