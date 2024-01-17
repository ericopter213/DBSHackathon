import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
	Container,
	TextField,
	Button,
	Typography,
	Grid,
	Link,
} from "@mui/material";

const Signup = () => {
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSignup = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post("http://localhost:9000/signup", {
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
					Sign Up
				</Typography>
				<form onSubmit={handleSignup}>
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
						label="Email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
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
						Sign Up
					</Button>
				</form>

				<Grid container justifyContent="flex-end">
					<Grid item>
						<Link href="/login" variant="body2">
							Already have an account? Login
						</Link>
					</Grid>
				</Grid>
			</div>
		</Container>
	);
};

export default Signup;
