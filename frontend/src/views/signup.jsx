import React, { useState } from "react";
import {
	Container,
	TextField,
	Button,
	Typography,
	Grid,
	Link,
} from "@mui/material";

const Signup = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSignup = (event) => {
		event.preventDefault();
		console.log("Signing up with:", { username, email, password });
	};

	return (
		<Container component="main" maxWidth="xs">
			<div>
				<Typography component="h1" variant="h5">
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
						<Link href="#" variant="body2">
							Already have an account? Login
						</Link>
					</Grid>
				</Grid>
			</div>
		</Container>
	);
};

export default Signup;
