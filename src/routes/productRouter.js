const { Router } = require("express");
const product = require("../controllers/productController")

var router = Router();

router.get("/",product.getAllProducts);

router.get("/:id",product.getProductByID);

router.post("/order",product.orderProduct);


module.exports = router 