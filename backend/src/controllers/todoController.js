const { Todo, Category } = require("../models");
const { Op } = require("sequelize");

class TodoController {
  static async getAll(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const search = req.query.search || "";
      const category = req.query.category || "";
      const priority = req.query.priority || "";

      const where = {};

      if (search) where.title = { [Op.iLike]: `%${search}%` };
      if (category) where.category_id = category;
      if (priority) where.priority = priority;

      const { count, rows } = await Todo.findAndCountAll({
        where,
        include: [
          {
            model: Category,
            as: "category",
            attributes: ["id", "name", "color"],
          },
        ],
        limit,
        offset,
        order: [["created_at", "DESC"]],
      });

      return res.json({
        data: rows,
        pagination: {
          current_page: page,
          per_page: limit,
          total: count,
          total_pages: Math.ceil(count / limit),
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error fetching todos" });
    }
  }

  static async getById(req, res) {
    try {
      const todo = await Todo.findByPk(req.params.id, {
        include: [
          {
            model: Category,
            as: "category",
            attributes: ["id", "name", "color"],
          },
        ],
      });

      if (!todo) return res.status(404).json({ message: "Todo not found" });

      res.json(todo);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error fetching todo" });
    }
  }

  static async create(req, res) {
    try {
      const todo = await Todo.create(req.body);
      res.status(201).json(todo);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error creating todo" });
    }
  }

  static async update(req, res) {
    try {
      await Todo.update(req.body, { where: { id: req.params.id } });
      res.json({ message: "Todo updated" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updating todo" });
    }
  }

  static async delete(req, res) {
    try {
      await Todo.destroy({ where: { id: req.params.id } });
      res.json({ message: "Todo deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error deleting todo" });
    }
  }

  static async toggleComplete(req, res) {
    try {
      const todo = await Todo.findByPk(req.params.id);
      if (!todo) return res.status(404).json({ message: "Todo not found" });

      todo.completed = !todo.completed;
      await todo.save();
      res.json(todo);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error toggling todo" });
    }
  }
}

module.exports = TodoController;
