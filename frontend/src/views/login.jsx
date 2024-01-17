import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
	Container,
	TextField,
	Button,
	Typography,
	Link,
	Grid,
} from "@mui/material";

const Login = () => {
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const response = await axios.post("http://localhost:9000/login", {
				username,
				password,
			});

			console.log("Login successful:", response.data);
			navigate("/homepage");
		} catch (error) {
			console.error(
				"Error during login:",
				error.response ? error.response.data : error.message
			);
		}
	};

	return (
		<Container
			component="main"
			maxWidth="xs"
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				paddingTop: "50px",
			}}>
			<div>
				<Typography
					component="h1"
					variant="h5"
					style={{ textAlign: "center" }}>
					Login
				</Typography>
				<form onSubmit={handleLogin}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="Username"
						autoFocus
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="Password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary">
						Login
					</Button>
				</form>

				<Grid container justifyContent="flex-end">
					<Grid item>
						<Link href="/signup" variant="body2">
							Don't have an account? Sign Up
						</Link>
					</Grid>
				</Grid>
			</div>
		</Container>
	);
};

export default Login;
