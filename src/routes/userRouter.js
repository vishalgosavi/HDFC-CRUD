const { Router } = require("express");
const user = require("../controllers/userController")

const router = Router();

router.post("/",user.createUser);

router.get("/me/orders",user.getOrdersByID);

router.post("/login",user.loginUser);

router.post("/me",user.updateUser);

module.exports = router