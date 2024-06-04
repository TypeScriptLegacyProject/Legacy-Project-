// routes/authRoutes.js
const router = require("express").Router();

const {
  login,
  register,
  UpdateUser,
} = require("../controllers/authControllers.js");

router.post("/login", login);
router.post("/register", register);
router.put("/update/:id", UpdateUser);
module.exports = router;
