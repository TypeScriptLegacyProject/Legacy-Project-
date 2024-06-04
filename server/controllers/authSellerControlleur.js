const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const User = require("../models/UserModels.js");
const db = require("../database/index.js");
const { JWT_SECRET } = require("../../config");

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const seller = await db.Seller.findOne({ where: { username } });

    if (!seller) {
      return res.status(404).json({ message: "seller not found" });
    }

    const isValidPassword = await bcrypt.compare(password, seller.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { sellerId: seller.id, role: seller.role },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({ token, seller, role: seller.role });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error" });
  }
}

async function register(req, res) {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const seller = await db.Seller.create({
      username,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "seller created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error" });
  }
}

module.exports = { login, register };
