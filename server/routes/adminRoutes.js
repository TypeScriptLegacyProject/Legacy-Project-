const router = require("express").Router();

const { getadmin, addadmin, getOneadmin, removeadmin, updateadmin, allCustomer}=require("../controllers/adminControllers")


router.get("/admin", getadmin)
router.get("/Customer",allCustomer)
router.post("/admin", addadmin)
router.get("/admin/:id", getOneadmin)
router.delete("/admin/:id", removeadmin)
router.put("/admin/:id",updateadmin)

module.exports = router;