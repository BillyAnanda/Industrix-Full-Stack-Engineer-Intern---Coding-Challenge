// src/models/index.js
const sequelize = require("../config/database");
const Category = require("./Category");
const Todo = require("./Todo");

// RELASI LENGKAP
Category.hasMany(Todo, {
  foreignKey: "category_id",
  as: "todos",
});

Todo.belongsTo(Category, {
  foreignKey: "category_id",
  as: "category",
});

module.exports = {
  sequelize,
  Category,
  Todo,
};
