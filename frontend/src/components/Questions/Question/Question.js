import "./Question.css";
import React from "react";
import { Checkbox, FormControlLabel, withStyles } from "@material-ui/core";

const CustomCheckBox = withStyles({
	root: {
		color: "#6C63FF",
		"&$checked": {
			color: "#6C63FF",
		},
	},
	checked: {},
})((props) => <Checkbox color="default" {...props} />);

const Question = ({ question, toggleQuestion }) => {
	const handleChecked = () => {
		toggleQuestion(question._id);
	};

	return (
		<table style={{ width: "100%" }}>
			<tr>
				<td style={{ paddingLeft: "12px", width: "25px" }}>
					<FormControlLabel
						control={
							<CustomCheckBox
								checked={question.done}
								onChange={handleChecked}
							/>
						}
					/>
				</td>
				<td
					style={{
						paddingTop: "13px",
						float: "left",
						paddingLeft: "25px",
						// height: "25px",
					}}
				>
					<a style={{ color: "#000", fontWeight: "500" }} href={question.link}>
						{question.question}
					</a>
				</td>
				<td
					style={{
						paddingBottom: "9px",
						float: "center",
						// paddingRight: "25px",
						// height: "25px",
						width: "200px",
					}}
				>
					<a className="category">{question.category}</a>
				</td>
			</tr>
		</table>
	);
};

export default Question;
