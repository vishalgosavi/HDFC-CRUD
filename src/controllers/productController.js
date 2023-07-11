const Product = require("../models/productModel");
const Order= require("../models/orderModel");

exports.getAllProducts = (req, res) => {

    Product.findAll()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Product."
            });
        });
};

exports.getProductByID = (req, res) => {
    const id = req.params.id;

    Product.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find product with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving product with id=" + id
            });
        });
};

exports.orderProduct = async (req, res) => {
  
    const product = {
        orderId: req.body.orderId,
        productId: req.body.productId,
        product: req.body.product,
        userEmail:req.body.userEmail, 
    };
  
    Order.create(product)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the order."
        });
      });
  
  }