const SellerRoute = require("express").Router();

const {
  getSellerProd,
  getOneSellerProd,
  addSellerProd,
  updateSellerProd,
  removeSellerProd,
  getSeller,
  removeSeller,
  addseller,
} = require("../controllers/sellerController");

SellerRoute.get("/seller/seller", getSeller);
SellerRoute.get("/seller/prod/:idd", getSellerProd);
SellerRoute.get("/seller/:id", getOneSellerProd);
SellerRoute.post("addseller",addseller)
SellerRoute.post("/seller", addSellerProd);
SellerRoute.put("/seller/:id", updateSellerProd);
SellerRoute.delete("/seller/:id", removeSellerProd);

SellerRoute.delete("/seller/seller/:id", removeSeller);
module.exports = SellerRoute;


