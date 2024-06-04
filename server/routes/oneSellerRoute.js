const sellerRoute = require("express").Router();
const {getOne,updateOne} = require('../controllers/oneSellerController')


sellerRoute.get("./getSeller:id",getOne)
sellerRoute.put("./editSeller:id",updateOne)

module.exports = sellerRoute


