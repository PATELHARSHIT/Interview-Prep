const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
	categoryName: String,
});

const Categories = mongoose.model("Categories", categorySchema);
module.exports = Categories;
