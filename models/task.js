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