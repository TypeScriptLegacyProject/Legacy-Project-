const SellerRoute = require("express").Router();

const {
  getSellerProd,
  getOneSellerProd,
  addSellerProd,
  updateSellerProd,
  removeSellerProd,
  getSeller,
  removeSeller,
} = require("../controllers/sellerController");

SellerRoute.get("/seller/seller", getSeller);
SellerRoute.get("/seller", getSellerProd);
SellerRoute.get("/seller/:id", getOneSellerProd);
SellerRoute.post("/seller", addSellerProd);
SellerRoute.put("/seller/:id", updateSellerProd);
SellerRoute.delete("/seller/:id", removeSellerProd);

SellerRoute.delete("/seller/seller/:id", removeSeller);
module.exports = SellerRoute;


