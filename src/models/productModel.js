const Sequelize = require("sequelize");
const sequelize = require("./index");

const Product = sequelize.define("product", {
  productId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  productName: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.INTEGER
  },
});

module.exports = Product;