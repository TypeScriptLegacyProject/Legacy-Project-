// routes/authRoutes.js
const router = require("express").Router();

const {
  login,
  register,
  UpdateUser,
  UpdateSeller,
} = require("../controllers/authControllers.js");

router.post("/login", login);
router.post("/register", register);
router.put("/updateUser", UpdateUser);
router.put("/updateSeller", UpdateSeller);
module.exports = router;
