require("../models/cakes.js");
var mongoose = require("mongoose");
var Cake = mongoose.model("Cake");
var Rating = mongoose.model("Rating");

module.exports = {

  index: function(req, res) {
    res.json("Default");
  },

  getAll: function(req, res) {
    Cake.find({}, function(err, cakes) {
      if(err) {
        console.log("Find All Error " + err);
        res.json({message:"Error", error: err})
      } else {
        res.json({cakes: cakes});
      }
    });
  },
  getOne: function(req, res) {
    Cake.findById(req.params.id, function(err, cake) {
      if(err) {
        console.log("Show One Error " + err);
        res.json({message: "Show One Error ", error: err});
      }else {
        res.json({cake: cake});
      }
    });
  },
  new: function(req, res) {
    var cake = new Cake();
    cake.title = req.body.title;
    cake.url = req.body.url;
    cake.save(function(err) {
      if(err) {
        console.log("New Cake Error " + err);
        res.json({message: "New Cake Error", error: err});
      }else {
        res.json({message: "New Cake Success"});
      }
    });
  },
  addRating: function(req, res) {
    var rating = new Rating();
    rating.rating = req.body.rating;
    rating.comment = req.body.comment;
    rating.save(function(err) {
      if(err) {
        console.log("New Rating Error" + err);
        res.json({message: "New Rating Error", error: err});
      }else {
        Cake.findByIdAndUpdate(req.params.id, {$push: {ratings: rating}}, function(err) {
          if(err) {
            console.log("Rating Add Error " + err);
            res.json({message: "Rating Add Error", error: err});
          }else {
            res.json({message: "Rating Add Success"})
          }
        });
      }
    });
  },
  delete: function(req, res) {
    Cake.findByIdandDelete(req.params.id, function(err) {
      if(err) {
        console.log("Delete Error" + err);
        res.json({message:"Delete Error", error: err});
      }else {
        res.json({message: "Delete Success"})
      }
    });
  },
}
