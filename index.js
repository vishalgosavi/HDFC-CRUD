const express = require("express");
const userRoute = require("./src/routes/userRouter");
const productRoute = require("./src/routes/productRouter");
const sequelize = require("./src/models/index");
const Product = require("./src/models/productModel");
const { validateAuth } = require("./auth");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use([validateAuth]);

sequelize.sync()
  .then(() => {
    console.log("Synced db.");
    // Product.create({productId:4,productName:"Shirt",price:200}) 
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


//user route
app.use("/users", userRoute);

//product route
app.use("/products", productRoute);


// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});