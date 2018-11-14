const main = require("../controllers/main.js");

module.exports = function(app) {

  app.get("/", function(req, res) {
    main.index(req, res);
  });

  app.get("/cakes", function(req, res)  {
    main.getAll(req, res);
  });

  app.get("/cakes/:id", function(req, res) {
    main.getOne(req, res);
  });

  app.post("/cakes", function(req, res) {
    main.new(req, res);
  });

  app.post("/cakes/rating/:id", function(req, res) {
    main.addRating(req, res);
  });

  app.delete("/cakes/:id", function(req, res) {
    main.delete(req, res);
  });
}
