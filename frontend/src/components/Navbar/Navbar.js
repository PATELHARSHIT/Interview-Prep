import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Container } from "@material-ui/core";

export default function Navbar() {
	return (
		<div>
			<Container>
				<Toolbar>
					<Typography
						variant="h5"
						style={{ color: "#6C63FF", fontWeight: "600" }}
					>
						InterviewPrep
					</Typography>
				</Toolbar>
			</Container>
		</div>
	);
}
