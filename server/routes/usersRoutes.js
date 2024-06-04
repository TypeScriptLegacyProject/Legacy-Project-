const router = require("express").Router();

const {
  getusers,
  addusers,
  getOneuser,
  removeuser,
} = require("../controllers/userControllerss");

router.get("/users", getusers);
router.post("/users", addusers);

router.get("/users/:id", getOneuser);
router.delete("/users/:id", removeuser);
module.exports = router;
