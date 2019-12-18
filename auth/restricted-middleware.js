const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
  
    if (authorization) {
      const secret = process.env.JWT_SECRET || "it's the snack that smiles back";
  
      jwt.verify(authorization, secret, function(err, decodedToken) {
        if (err) {
          res.status(401).json({ message: "Invalid Token", err });
        } else {
          req.token = decodedToken;
  
          next();
        }
      });
    } else {
      res.status(400).json({ message: "Please login and try again" });
    }
  };