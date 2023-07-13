const jwt = require("jsonwebtoken");
require("dotenv").config();
let envKey = process.env.PUBLICKEY;
let publicKEY = envKey.replace(/\\n/g, "\n");

const i = "Application";
const s = "";
const a = "";

const verifyOptions = {
  issuer: i,
  subject: s,
  audience: a,
  algorithm: ["RS256"],
};

exports.verifyToken = async (req, res, next) => {
  let legit = "";
  try {
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
      const token = req.headers.authorization.split(" ")[1];
      legit = jwt.verify(token, publicKEY, verifyOptions);
      if (legit) {
        req.payload = legit;
        next();
      }
      else {
        res.status(401).send("Access denied,invalid token");
      }
    } else {
      res
        .status(401)
        .send("Access denied, check the access token is sent correctly.");
    }
  } catch (error) {
    console.log("Error in token validation", error);
    res.status(401).send({ message: error.name });
  }
};
