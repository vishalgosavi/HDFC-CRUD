const express = require("express");
const userRoute = require("./src/routes/userRouter");
const productRoute = require("./src/routes/productRouter");
const sequelize = require("./src/models/index");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use("/users", userRoute);

app.use("/products", productRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});