const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const pagination = require("../utility/pagination");
const sorting = require("../utility/sorting");
const getUser = require("../utility/getuser");

exports.getAllProducts = async (req, res) => {
  const pageAsNumber = Number.parseInt(req.query.page);
  const sizeAsNumber = Number.parseInt(req.query.size);
  const sort = req.query.sort;

  const sortArray = await sorting(sort);
  const { page, size } = await pagination(pageAsNumber, sizeAsNumber);

  Product.findAndCountAll({ order: [sortArray], limit: size, offset: (page-1) * size })
    .then(data => {
      res.status(200).send({
        content: data.rows,
        totalPages: Math.ceil(data.count / Number.parseInt(size))
      });
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

exports.orderProduct = (req, res) => {

  const product = {
    orderId: req.body.orderId,
    productId: req.body.productId,
    product: req.body.product,
    userEmail: req.body.userEmail,
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

exports.createProducts = async (req, res) => {

  const product = {
    productId: req.body.productId,
    productName: req.body.productName,
    price: req.body.price,
  };

  Product.create(product)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while inserting the product."
      });
    });

}

exports.updateProduct = async (req, res) => {
  const emailId = req.payload.email;
  const id = req.body.productId;

  if (!id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const user = await getUser(emailId);

  console.log("user::",user);

  if (user.role.trim().toLowerCase() === "admin") {
    Product.update(req.body, {
      where: { productId: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Product updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update product with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating product with id=" + id
        });
      });
  }else{
    res.status(400).send({
      message: "You are not authorized person to update record"
    });
    return;
  }

}

exports.deleteProduct = async(req, res) => {
  const emailId = req.payload.email;
  const id = req.params.id;

  if (!id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const user = await getUser(emailId);

  if (user.role.trim().toLowerCase() === "admin") {
    Product.destroy({
      where: { productId: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Product deleted successfully."
          });
        } else {
          res.send({
            message: `Cannot delete product with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error deleting product with id=" + id
        });
      });
  }else{
    res.status(400).send({
      message: "You are not authorized person to update record"
    });
    return;
  }

}
