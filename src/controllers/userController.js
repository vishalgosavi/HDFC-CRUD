const User = require("../models/userModel");
const Order = require("../models/orderModel");
const getUser = require("../utility/getuser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const tokenGeneration = async(userData) => {
  let envKey = process.env.PRIVATEKEY;
  let privateKEY = envKey.replace(/\\n/g, "\n");

  let i = "Application"; // Issuer
  let s = ""; // Subject
  let a = ""; // Audience

  let signOptions = {
    issuer: i,
    subject: s,
    audience: a,
    expiresIn: "1d",
    algorithm: "RS256",
  };
  let token =await jwt.sign(userData, privateKEY, signOptions);
  return token;
};

exports.loginUser = async (req, res) => {

  const user = await getUser(req.body.email);

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) {
    console.error("Password is incorrect");
    res
      .status(401)
      .send({ message: "Password is incorrect, Unauthorized User" });
  }

  try{
  let token=await tokenGeneration(user);
      res.send({ Message: "Logged In successfully", Token: token });
  }catch(err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while login the user."
      });
    }
};

exports.createUser = async (req, res) => {
  if (!req.body.userId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const user = {
    name: req.body.name,
    role: req.body.role,
    userId: req.body.userId,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10)
  };

  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user."
      });
    });

}

exports.getAllUsers = (req, res) => {

  User.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};

exports.getOrdersByID = (req, res) => {
  let emailId = req.payload.email;

  Order.findAll({where:{userEmail:emailId}})
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find orders`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving orders"
      });
    });
};

exports.updateUser = (req, res) => {
  const id = req.body.userId;

  User.update(req.body, {
    where: { userId: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update user with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating user with id=" + id
      });
    });
};