// src/services/todoService.js
const { Todo, Category } = require("../models");
const { Op } = require("sequelize");

class TodoService {
  static async getAll(page = 1, limit = 10, search = "") {
    const offset = (page - 1) * limit;

    return Todo.findAndCountAll({
      where: {
        title: {
          [Op.iLike]: `%${search}%`,
        },
      },
      include: [{ model: Category, as: "category" }],
      limit,
      offset,
      order: [["id", "ASC"]],
    });
  }

  static async getById(id) {
    return Todo.findByPk(id, {
      include: [{ model: Category, as: "category" }],
    });
  }

  static async create(data) {
    return Todo.create(data);
  }

  static async update(id, data) {
    return Todo.update(data, { where: { id } });
  }

  static async delete(id) {
    return Todo.destroy({ where: { id } });
  }

  static async toggleComplete(id) {
    const todo = await Todo.findByPk(id);
    todo.completed = !todo.completed;
    await todo.save();
    return todo;
  }
}

module.exports = TodoService;
