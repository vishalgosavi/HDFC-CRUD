const Sequelize = require("sequelize");
const sequelize = require("./index");

const Order = sequelize.define("order", {
  orderId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  productId: {
    type: Sequelize.INTEGER
  },
  product: {
    type: Sequelize.STRING
  },
  userEmail: {
    type: Sequelize.STRING
  },
});

module.exports = Order;