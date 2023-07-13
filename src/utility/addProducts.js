const Product = require("../models/productModel");
const data = require("./products.json");

const addProducts = async() => {
    await Product.bulkCreate(data,{returing: true});
  }

  module.exports = addProducts;