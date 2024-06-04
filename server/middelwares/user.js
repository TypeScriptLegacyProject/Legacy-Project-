const jwttoken = require("jsonwebtoken");

const autoriser = (req, res, next) => {
  const token = req.headers.token;
  jwttoken.verify(token, "your_generated_secret_key_here", (err, decoded) => {
    if (err) res.send("ther is no token");
    console.log(decoded);
    if (decoded.role === "user") {
      next();
    } else {
      res.send("u r not authorised");
    }
  });
};
module.exports = autoriser;
