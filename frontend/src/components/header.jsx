import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"; // Make sure to import Link from react-router-dom

const Header = () => {
	const navigate = useNavigate();
	const username = localStorage.getItem("username");

	const signOut = () => {
		// Clear the JWT token from localStorage or any other user-related data
		localStorage.clear();

		// Redirect the user to the login page
		navigate("/login");
	};

	return (
		<AppBar position="static">
			<Toolbar>
				
				<Typography variant="h6" onClick={() => navigate("/homepage")}>
					DBSHack Prep
				</Typography>

				<div>
					<Button color="inherit" component={Link} to="/create">
						Create
					</Button>
					<Button color="inherit" component={Link} to="/read">
						Read
					</Button>
					<Button color="inherit" component={Link} to="/update">
						Update
					</Button>
					<Button color="inherit" component={Link} to="/delete">
						Delete
					</Button>
				</div>

				{/* Right side user name and sign-out */}
				<div
					style={{
						marginLeft: "auto",
						display: "flex",
						alignItems: "center",
					}}>
					<Typography variant="h6" style={{ marginRight: "16px" }}>
						{username}
					</Typography>
					<Button
						color="warning"
						onClick={signOut}
						component={Link}
						to="/login">
						Sign Out
					</Button>
				</div>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
