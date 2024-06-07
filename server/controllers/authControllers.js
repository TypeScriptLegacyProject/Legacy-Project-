const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../database/index.js");
const { JWT_SECRET } = require("../../config");

async function login(req, res) {
  const { username, email, password } = req.body;
  try {
    const user = await db.User.findOne({ where: { username } });
    const seller = await db.Seller.findOne({ where: { username } });
    const admin = await db.admin.findOne({ where: { username } });

    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "invalid password" });
      }

      const token = jwt.sign(
        { userId: user.id, role: user.role, username: user.username },
        JWT_SECRET
      );

      return res.status(200).json({ token, user });
    } else if (seller) {
      const PasswordisValid = await bcrypt.compare(password, seller.password);
      if (!PasswordisValid) {
        return res.status(401).json({ message: "invalid password" });
      }
      const tokenSeller = jwt.sign(

        { sellerId: seller.id, role: seller.role, username: seller.username },
        JWT_SECRET
      );
      return res.status(200).json({ tokenSeller, seller });
    } else if (admin) {
      const validpassword = await bcrypt.compare(password, admin.password);
      if (!validpassword) {
        return res.status(401).json({ message: "invalid password" });
      }
      const tokenadmin = jwt.sign(

        { adminId: admin.id, role: admin.role, username: admin.username },
        JWT_SECRET
      );
      return res.status(200).json({ tokenadmin, admin });
    } else {
      return res.status(404).json({ message: "not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error" });
  }
}

async function register(req, res) {
  const { username, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    if (role === "user") {
      await db.User.create({
        username,
        email,
        password: hashedPassword,
        role: "user",
      });
    } else if (role === "admin") {
      await db.admin.create({
        username,
        email,
        password: hashedPassword,
        role: "admin",
      });
    } else if (role === "seller") {
      await db.Seller.create({
        username,
        email,
        password: hashedPassword,
        role: "seller",
      });
    } else {
      return res.status(400).json({ message: "invalid role" });
    }
    return res.status(201).json({ message: "created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error" });
  }
}


 function UpdateUser(req, res) {
  db.User.findOne({ where: { email: req.body.email } })
    .then((User) => {
      if (!User) {
        return res.status(404).send("Invalid email");
      }

      bcrypt.compare(req.body.password, User.dataValues.password)
        .then((samepassword) => {
          if (samepassword) {
            
            if (req.body.newPassword) {
             
              bcrypt.hash(req.body.newPassword, 10)
                .then((hashedNewPassword) => {
                  db.User.update({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    password: hashedNewPassword
                  }, { where: { email: req.body.email } })
                    .then((result) => {
                      res.send(result);
                    })
                    .catch((updateError) => {
                      console.error("Update error:", updateError);
                      res.status(500).send(updateError);
                    });
                })
                .catch((hashError) => {
                  console.error("Hash error:", hashError);
                  res.status(500).send(hashError);
                });
            } else {
             
              db.User.update({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                address: req.body.address
              }, { where: { email: req.body.email } })
                .then((result) => {
                  res.send(result);
                })
                .catch((updateError) => {
                  console.error("Update error:", updateError);
                  res.status(500).send(updateError);
                });
            }
          } else {
            res.status(401).send("Invalid password");
          }
        })
        .catch((compareError) => {
          console.error("Password comparison error:", compareError);
          res.status(500).send(compareError);
        });
    })
    .catch((findError) => {
      console.error("Find User error:", findError);
      res.status(500).send(findError);
    });
}
function UpdateSeller(req, res) {
  db.Seller.findOne({ where: { email: req.body.email } })
    .then((Seller) => {
      if (!Seller) {
        return res.status(404).send("Invalid email");
      }

      bcrypt.compare(req.body.password, Seller.dataValues.password)
        .then((samepassword) => {
          if (samepassword) {
            
            if (req.body.newPassword) {
             
              bcrypt.hash(req.body.newPassword, 10)
                .then((hashedNewPassword) => {
                  db.Seller.update({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    password: hashedNewPassword
                  }, { where: { email: req.body.email } })
                    .then((result) => {
                      res.send(result);
                    })
                    .catch((updateError) => {
                      console.error("Update error:", updateError);
                      res.status(500).send(updateError);
                    });
                })
                .catch((hashError) => {
                  console.error("Hash error:", hashError);
                  res.status(500).send(hashError);
                });
            } else {
             
              db.Seller.update({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                address: req.body.address
              }, { where: { email: req.body.email } })
                .then((result) => {
                  res.send(result);
                })
                .catch((updateError) => {
                  console.error("Update error:", updateError);
                  res.status(500).send(updateError);
                });
            }
          } else {
            res.status(401).send("Invalid password");
          }
        })
        .catch((compareError) => {
          console.error("Password comparison error:", compareError);
          res.status(500).send(compareError);
        });
    })
    .catch((findError) => {
      console.error("Find Seller error:", findError);
      res.status(500).send(findError);
    });
}

module.exports = { login, register, UpdateUser,UpdateSeller };


// Changes made:
// Added proper status codes and messages for different error cases.
// Removed unnecessary commented-out code for admin password check.
// Added validation to return a proper message if the role is invalid.
// Removed the expiresIn: "1h" option from all JWT token generations.