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
	Container,
	Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import Header from "../components/header";

const Homepage = () => {
	const navigate = useNavigate();
	const [transactionsData, setTransactionsData] = useState([]);

	// Fetch data from Express backend when the component mounts
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`${process.env.REACT_APP_BACKEND_URL}transactions`
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
			<Container style={{ marginTop: "20px" }}>
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
								<TableRow key={transaction._id}>
									<TableCell>{transaction._id}</TableCell>
									<TableCell>
										{transaction.description}
									</TableCell>
									<TableCell>{transaction.amount}</TableCell>
									<TableCell>
										<Button
											variant="outlined"
											color="primary"
											style={{ marginRight: "8px" }}
											onClick={() =>
												navigate(
													`/read?id=${transaction._id}`
												)
											}>
											Read
										</Button>
										<Link
											to={`/update?id=${transaction._id}`}>
											<Button
												variant="outlined"
												color="primary"
												style={{ marginRight: "8px" }}
												onClick={() =>
													navigate(
														`/update?id=${transaction._id}`
													)
												}>
												Edit
											</Button>
										</Link>
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
			</Container>
		</div>
	);
};

export default Homepage;
