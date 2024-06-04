const { login, register } = require("../controllers/authSellerControlleur.js");
const routerAs = require("express").Router();

routerAs.post("/register", register);
routerAs.post("/login", login);

module.exports = routerAs;
