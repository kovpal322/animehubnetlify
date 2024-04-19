const jwt = require("jsonwebtoken");
require("dotenv").config();
const requireAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json("request is not authorized");
  }

  try {
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY);

    next();
  } catch (err) {
    res.status(401).json("request is not authorized");
  }
};
module.exports = { requireAuth };
