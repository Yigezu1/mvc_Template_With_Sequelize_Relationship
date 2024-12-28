var db = require("../models");

module.exports = function(app) {
  app.get("/api/owners", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Task
    db.Owner.findAll({
      include: [db.Task]
    }).then(function(dbOwner) {
      res.json(dbOwner);
    });
  });

  app.get("/api/owners/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Task
    db.Owner.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Task]
    }).then(function(dbOwner) {
      res.json(dbOwner);
    });
  });

  app.post("/api/owners", function(req, res) {
    db.Owner.create(req.body).then(function(dbOwner) {
      res.json(dbOwner);
    });
  });

  app.delete("/api/owners/:id", function(req, res) {
    db.Owner.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbOwner) {
      res.json(dbOwner);
    });
  });

};
