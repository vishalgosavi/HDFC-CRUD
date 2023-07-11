const jwt = require("jsonwebtoken");
require("dotenv").config();
console.log("hi",process.env.PUBLICKEY)
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

exports.validateAuth = async (req, res, next) => {
  try {
    if (req.originalUrl.includes("/users/login") || req.originalUrl === "/user" || req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {

      let legit = "";
      if (
        req.originalUrl.includes("/users/login") ||
        req.originalUrl === "/user"
      ) {
        legit = true;
      } else {
        const token = req.headers.authorization.split(" ")[1];
        legit = jwt.verify(token, publicKEY, verifyOptions);
        if (legit) {
          req.payload = legit;
        }
      }
      if (legit) {
        next();
      } else {
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
