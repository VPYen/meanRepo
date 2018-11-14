var mongoose = require('mongoose');

var RatingSchema = new mongoose.Schema ({
  rating: {type: Number, required: [true, "Enter a rating"], min: 1, max: 5},
  comment: {type: String},
}, {timestamps: true});

var CakeSchema = new mongoose.Schema({
  title: {type: String, required: [true, "Enter a title"]},
  url: {type: String, required: [true, "Enter a image url"]},
  ratings: [RatingSchema],
}, {timestamps: true});

mongoose.model("Cake", CakeSchema);
mongoose.model("Rating", RatingSchema);
