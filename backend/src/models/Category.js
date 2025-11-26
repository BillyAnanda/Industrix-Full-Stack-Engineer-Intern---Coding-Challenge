// src/models/Category.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Model Category = representasi tabel "categories" di database
const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, // nama kategori wajib diisi
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true, // boleh kosong, warna opsional
    },
  },
  {
    tableName: "categories", // nama tabel di PostgreSQL
    timestamps: true,        // pakai createdAt & updatedAt otomatis
    createdAt: "created_at", // map ke kolom created_at
    updatedAt: "updated_at", // map ke kolom updated_at
  }
);

module.exports = Category;
