// src/models/Todo.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Category = require("./Category"); // supaya bisa bikin relasi

// Model Todo = representasi tabel "todos" di database
const Todo = sequelize.define(
  "Todo",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false, // judul wajib diisi
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // default belum selesai
    },
    priority: {
      type: DataTypes.ENUM("high", "medium", "low"),
      defaultValue: "low",
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
      model: Category,
      key: "id"
  }
},

    // category_id akan jadi foreign key, tapi definisikan di relasi
  },
  {
    tableName: "todos",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    underscored: true,
  }
);

module.exports = Todo;
