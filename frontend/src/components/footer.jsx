import React from "react";
import {
	BottomNavigation,
	BottomNavigationAction,
	Typography,
	Container,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
	return (
		<Container>
			<BottomNavigation>
				<BottomNavigationAction
					label="LinkedIn"
					icon={<LinkedInIcon />}
					href="https://www.linkedin.com/"
					target="_blank"
					rel="noopener noreferrer"
				/>
				<BottomNavigationAction
					label="Twitter"
					icon={<TwitterIcon />}
					href="https://twitter.com/"
					target="_blank"
					rel="noopener noreferrer"
				/>
				<BottomNavigationAction
					label="GitHub"
					icon={<GitHubIcon />}
					href="https://github.com/"
					target="_blank"
					rel="noopener noreferrer"
				/>
			</BottomNavigation>
			<Typography
				variant="body2"
				align="center"
				color="textSecondary"
				gutterBottom>
				Your App Name &copy; {new Date().getFullYear()}
			</Typography>
		</Container>
	);
};

export default Footer;
