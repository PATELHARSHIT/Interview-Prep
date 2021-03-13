import {
	Container,
	FormControl,
	Grid,
	InputLabel,
	makeStyles,
	MenuItem,
	Select,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import Question from "./Question/Question";

const Questions = () => {
	const [question, setQuestion] = useState([]);
	const [category, setCategory] = useState([]);
	const [categories, setCategories] = useState([]);
	const [done, setDone] = useState();
	const fetchQuestion = () => {
		axios.get(`/getQues/${category}`).then((res) => {
			setQuestion(res.data.questions);
			const d = res.data.questions.filter((q) => q.done === true).length;
			setDone(d);
			// setCategories(res.data.categories);
		});
	};

	const fetchCategories = () => {
		axios.get(`/cat`).then((res) => {
			setQuestion(res.data.questions);
			setCategories(res.data.categories);
			const d = res.data.questions.filter((q) => q.done === true).length;
			setDone(d);
		});
	};

	useEffect(() => {
		fetchCategories();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		fetchQuestion();
		// eslint-disable-next-line
	}, [category, done]);

	const toggleQuestion = (id) => {
		const newQuestions = [...question];
		const ques = newQuestions.find((q) => q._id === id);

		ques.done = !ques.done;
		setQuestion(newQuestions);

		const d = newQuestions.filter((q) => q.done === true).length;
		setDone(d);

		axios.post(`/toggleQues/${id}/${ques.done}`).then(
			(response) => {
				console.log(response);
			},
			(error) => {
				console.log(error);
			}
		);
	};

	const useStyles = makeStyles((theme) => ({
		formControl: {
			margin: theme.spacing(1),
			minWidth: 250,
			float: "left",
			marginBottom: "30px",
		},
		selectEmpty: {
			marginTop: theme.spacing(2),
		},
	}));

	const handleChangeCategory = (e) => {
		setCategory(e.target.value);
	};

	const classes = useStyles();
	return (
		<Container
			style={{
				paddingTop: "0px",
				marginTop: "0px",
			}}
		>
			<Grid container>
				<Grid
					item
					xs={12}
					lg={10}
					style={{
						margin: "auto",
						padding: "12px 30px 12px",
					}}
				>
					<FormControl
						size="small"
						variant="outlined"
						className={classes.formControl}
						style={{ float: "right" }}
					>
						<InputLabel id="demo-simple-select-outlined-label">
							Category
						</InputLabel>
						<Select
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							value={category}
							onChange={handleChangeCategory}
							label="Category"
						>
							{categories.map((cat) => (
								<MenuItem key={cat._id} value={cat.categoryName}>
									{cat.categoryName}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<tr>
						<td style={{ float: "left", color: "" }}>
							<h3>Questions: </h3>
						</td>
						<td style={{ float: "left", marginLeft: "12px", color: "#6C63FF" }}>
							<h3>
								{done} / {question.length}
							</h3>
						</td>
					</tr>

					<table
						style={{
							width: "100%",
						}}
					>
						<tr>
							<th
								style={{
									width: "25px",
									float: "left",
									fontWeight: "500",
								}}
							>
								Status
							</th>
							<th
								style={{
									paddingTop: "1px",
									float: "left",
									paddingLeft: "60px",
									fontWeight: "500",
								}}
							>
								Question
							</th>
							<th
								style={{
									paddingTop: "1px",
									float: "center",
									width: "200px",
									fontWeight: "500",
								}}
							>
								Category
							</th>
						</tr>
					</table>
					<br />
					{question.map((question) => (
						<Question
							key={question._id}
							question={question}
							toggleQuestion={toggleQuestion}
						/>
					))}
				</Grid>
			</Grid>
			<br />
		</Container>
	);
};

export default Questions;
