const { Router } = require("express");
const product = require("../controllers/productController");
const { verifyToken } = require("../../middleware/verifyToken");

var router = Router();

router.get("/",verifyToken,product.getAllProducts);

router.get("/:id",verifyToken,product.getProductByID);

router.post("/order",verifyToken,product.orderProduct);

router.put("/update",verifyToken,product.updateProduct);

router.delete("/delete/:id",verifyToken,product.deleteProduct);

router.post("/",verifyToken,product.createProducts);

module.exports = router 