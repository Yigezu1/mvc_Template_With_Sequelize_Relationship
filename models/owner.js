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