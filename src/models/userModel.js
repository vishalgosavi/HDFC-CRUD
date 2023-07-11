const Sequelize = require("sequelize");
const sequelize = require("./index");

const User = sequelize.define("user", {
  userId: {
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  password: {
    type: Sequelize.STRING
  },
});

module.exports = User;
  