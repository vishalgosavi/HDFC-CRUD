const { Router } = require("express");
const user = require("../controllers/userController");
const { verifyToken } = require("../../middleware/verifyToken"); 

const router = Router();

router.post("/",user.createUser);

router.post("/login",user.loginUser);

router.get("/me/orders",verifyToken,user.getOrdersByID);

router.put("/me",verifyToken,user.updateUser);

router.put("/resetPass",verifyToken,user.resetPassword);

module.exports = router