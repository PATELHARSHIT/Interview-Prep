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
	const [category, setCategory] = useState(["All"]);
	const [categories, setCategories] = useState([]);
	const fetchQuestion = () => {
		axios.get(`/getQues/${category}`).then((res) => {
			setQuestion(res.data.questions);
			// setCategories(res.data.categories);
		});
	};

	const fetchCategories = () => {
		axios.get(`/cat`).then((res) => {
			setQuestion(res.data.questions);
			setCategories(res.data.categories);
		});
	};

	useEffect(() => {
		fetchCategories();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		fetchQuestion();
		// eslint-disable-next-line
	}, [category]);

	const toggleQuestion = (id) => {
		const newQuestions = [...question];
		const ques = newQuestions.find((q) => q._id === id);

		ques.done = !ques.done;
		setQuestion(newQuestions);
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
					<FormControl className={classes.formControl}>
						<InputLabel id="demo-simple-select-label">Category</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={category}
							onChange={handleChangeCategory}
						>
							{categories.map((cat) => (
								<MenuItem key={cat._id} value={cat.categoryName}>
									{cat.categoryName}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<table
						style={{
							width: "100%",
						}}
					>
						<tr>
							<td>
								<h3>Questions: </h3>
							</td>
							<td>
								<h3 style={{ float: "left" }}>{question.length}</h3>
							</td>
						</tr>
						<tr>
							<th
								style={{
									width: "25px",
									color: "#05396B",
								}}
							>
								Status
							</th>
							<th
								style={{
									paddingTop: "1px",
									float: "left",
									paddingLeft: "35px",
									color: "#05396B",
								}}
							>
								Question
							</th>
							<th
								style={{
									paddingTop: "1px",
									float: "center",
									color: "#05396B",
									width: "200px",
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
