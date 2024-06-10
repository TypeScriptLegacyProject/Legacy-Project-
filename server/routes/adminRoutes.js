const router = require("express").Router();

const { getadmin, addadmin, getOneadmin, removeadmin, updateadmin, allCustomer, deleteall, changeRole } = require("../controllers/adminControllers");

router.get("/admin", getadmin);
router.get("/Customer", allCustomer);
router.post("/admin", addadmin);
router.get("/admin/:id", getOneadmin);
router.delete("/del/:email", deleteall);
router.put("/admin/:id", updateadmin);
router.post("/changeRole", changeRole);

module.exports = router;
