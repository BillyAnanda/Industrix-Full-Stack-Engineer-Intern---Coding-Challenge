const { Category } = require("../models");

class CategoryService {
  static async getAll() {
    return Category.findAll();
  }

  static async create(data) {
    return Category.create(data);
  }

  static async update(id, data) {
    return Category.update(data, { where: { id } });
  }

  static async delete(id) {
    return Category.destroy({ where: { id } });
  }
}

module.exports = CategoryService;
