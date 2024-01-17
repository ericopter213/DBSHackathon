import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom"; // Make sure to import Link from react-router-dom

const Header = () => {
	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6">DBSHack Prep</Typography>

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
						User Name
					</Typography>
					<Button color="warning" component={Link} to="/signout">
						Sign Out
					</Button>
				</div>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
