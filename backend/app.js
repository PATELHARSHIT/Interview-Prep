const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const Question = require("./models/Question");
const Categories = require("./models/Categories");

// const questions = [
// 	{
// 		id: 1,
// 		question: "Largest Element in an Array",
// 		link: "https://material-ui.com/components/app-bar/#app-bar",
// 		category: "Array",
// 		done: false,
// 	},
// 	{
// 		id: 2,
// 		question: "Rearrange an array with O(1) extra space",
// 		link: "https://material-ui.com/components/app-bar/#app-bar",
// 		category: "Matrix",
// 		done: true,
// 	},
// 	{
// 		id: 5,
// 		question: "Rearrange an array with O(1) extra space",
// 		link: "https://material-ui.com/components/app-bar/#app-bar",
// 		category: "String",
// 		done: true,
// 	},
// 	{
// 		id: 3,
// 		question: "Rearrange an array with O(1) extra space",
// 		link: "https://material-ui.com/components/app-bar/#app-bar",
// 		category: "Searching & Sorting",
// 		done: true,
// 	},
// 	{
// 		id: 4,
// 		question: "Rearrange an array with O(1) extra space",
// 		link: "https://material-ui.com/components/app-bar/#app-bar",
// 		category: "LinkedList",
// 		done: true,
// 	},
// ];

mongoose.connect("mongodb://localhost:27017/interviewDB", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});

app.get("/cat", async (req, res) => {
	const categories = await Categories.find({}).sort({ categoryName: 1 });
	const questions = await Question.find({});

	res.send({ questions: questions, categories: categories });
});

app.get("/getQues/:cat", async (req, res) => {
	const categories = await Categories.find({}).sort({ categoryName: 1 });
	const questions = await Question.find({});
	let ques = questions;
	if (req.params.cat == "" || req.params.cat == "All") {
		ques = questions;
	} else {
		ques = questions.filter((question) => question.category == req.params.cat);
	}
	res.send({ questions: ques, categories: categories });
});

app.post("/toggleQues/:id/:value", async (req, res) => {
	const qid = req.params.id;

	await Question.findByIdAndUpdate(
		{ _id: qid },
		{
			$set: {
				done: req.params.value,
			},
		}
	);
});

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});
