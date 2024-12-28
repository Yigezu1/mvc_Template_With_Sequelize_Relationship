# mvc_Template_With_Sequelize_Relationship
* Here are the steps in creating an mvc app with two or more models uisng sequelize orm.
1) Create the config folder and the config.json file that tell which database to use depending on the environment.
```javascript
{
  "development": {
    "username": "root",
    "password": null,
    "database": "mvc_tasks_development",
    "host": "127.0.0.1",
    "port": 3306,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "mvc_tasks_test",
    "host": "127.0.0.1",
    "port": 3306,
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "mvc_tasks",
    "host": "127.0.0.1",
    "port": 3306,
    "dialect": "mysql"
  }
}

```
2) Create the models folder and define each model within this folder. Below are the codes for task and author models.
    1)  task model
    ```javascript

    module.exports = function(sequelize, DataTypes) {
    var Task = sequelize.define("Task", {
        task_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
        },
        task_description: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
        },
        due_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        status:{
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Post.associate = function(models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Post.belongsTo(models.Author, {
        foreignKey: {
            allowNull: false
        }
        });
    };

    return Task;
    };

    ```
    2) owner model
    ```javascript
    module.exports = function(sequelize, DataTypes) {
    var Owner = sequelize.define("Owner", {
        // Giving the Author model a name of type STRING
        name: DataTypes.STRING
    });

    Owner.associate = function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Owner.hasMany(models.Task, {
        onDelete: "cascade"
        });
    };

    return Owner;
    };

    ```
3) Create the controllers folder and defin the controllers code for both of your models.
    1) taskController

    ```javascript
        // *********************************************************************************
    // api-routes.js - this file offers a set of routes for displaying and saving data to the db
    // *********************************************************************************

    // Dependencies
    // =============================================================

    // Requiring our models
    var db = require("../models");

    // Routes
    // =============================================================
    module.exports = function(app) {

    // GET route for getting all of the posts
    app.get("/api/tasks", function(req, res) {
        var query = {};
        if (req.query.owner_id) {
        query.OwnerId = req.query.owner_id;
        }
        // Here we add an "include" property to our options in our findAll query
        // We set the value to an array of the models we want to include in a left outer join
        // In this case, just db.Author
        db.Task.findAll({
        where: query,
        include: [db.Owner]
        }).then(function(dbTask) {
        res.json(dbTask);
        });
    });

    // Get route for retrieving a single post
    app.get("/api/tasks/:id", function(req, res) {
        // Here we add an "include" property to our options in our findOne query
        // We set the value to an array of the models we want to include in a left outer join
        // In this case, just db.Author
        db.Task.findOne({
        where: {
            id: req.params.id
        },
        include: [db.Owner]
        }).then(function(dbTask) {
        res.json(dbTask);
        });
    });

    // POST route for saving a new post
    app.post("/api/tasks", function(req, res) {
        db.Task.create(req.body).then(function(dbTask) {
        res.json(dbTask);
        });
    });

    // DELETE route for deleting posts
    app.delete("/api/tasks/:id", function(req, res) {
        db.Task.destroy({
        where: {
            id: req.params.id
        }
        }).then(function(dbTask) {
        res.json(dbTask);
        });
    });

    // PUT route for updating posts
    app.put("/api/tasks", function(req, res) {
        db.Post.update(
        req.body,
        {
            where: {
            id: req.body.id
            }
        }).then(function(dbTask) {
        res.json(dbTask);
        });
    });
    };
    ```
    2) ownerController
    ```javascript
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
    ```
    4) Create the "server.js" file for your application.
    