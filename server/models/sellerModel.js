module.exports = (sequelize, DataTypes) => {
  const Seller = sequelize.define("Seller", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "seller", "admin"),
      allowNull: false,
      defaultValue: "seller",
    },
  });
  return Seller;
};
