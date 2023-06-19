const { Sequelize, DataTypes } = require("sequelize");
const equelizeConnection = require("../core/db-connection");

const User = null;

equelizeConnection().then((sequelize) => {
  User = sequelize.define("user_utilities_app", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roles: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
    },
  });
});

module.exports = User;
