const { Router } = require("express");
const product = require("../controllers/productController");
const { verifyToken } = require("../../middleware/verifyToken");
const pagination = require("../../middleware/pagination");

var router = Router();

router.get("/",verifyToken,pagination,product.getAllProducts);

router.get("/:id",verifyToken,product.getProductByID);

router.post("/order",verifyToken,product.orderProduct);

router.put("/update",product.updateProduct);

router.delete("/delete",product.deleteProduct);

router.post("/",product.createProducts);

module.exports = router 