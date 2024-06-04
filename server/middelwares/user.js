const jwttoken = require("jsonwebtoken");

const autoriser = (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(403).send("Token not provided");
  }
  jwttoken.verify(token, "your_generated_secret_key_here", (err, decoded) => {
    if (err) return res.status(401).send("invalid token");
    if (decoded.role === "user") {
      next();
    } else {
      res.status(403).send("u r not authorised");
    }
  });
};
module.exports = autoriser;


//Changes made :
// i added a check to return a 403 status code if the token is not given and 401 status if the token is invalid
// and 403 if the user doesnt have the permission to access
