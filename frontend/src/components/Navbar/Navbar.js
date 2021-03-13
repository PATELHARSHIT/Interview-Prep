import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { AppBar, Container } from "@material-ui/core";

export default function Navbar() {
	return (
		<div style={{ marginBottom: "20px" }}>
			<AppBar position="static" style={{ backgroundColor: "white" }}>
				<Container>
					<Toolbar>
						<div>
							<Typography
								variant="h5"
								style={{
									fontFamily: "'Ubuntu', sans-serif",
									color: "#6C63FF",
									fontWeight: "500",
								}}
							>
								INTERVIEWPrep
							</Typography>
							<Typography
								variant="body2"
								style={{
									fontFamily: "'Ubuntu', sans-serif",
									color: "#444444",
									fontWeight: "400",
								}}
							>
								Cheatsheet by Love Babbar
							</Typography>
						</div>
					</Toolbar>
				</Container>
			</AppBar>
		</div>
	);
}
