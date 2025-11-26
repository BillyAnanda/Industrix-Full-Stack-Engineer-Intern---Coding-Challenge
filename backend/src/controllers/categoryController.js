const Category = require("../models/Category");

// CREATE Category
exports.createCategory = async (req, res) => {
  try {
    const { name, color } = req.body;
    const category = await Category.create({ name, color });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL Categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET Category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE Category
exports.updateCategory = async (req, res) => {
  try {
    const { name, color } = req.body;
    const category = await Category.findByPk(req.params.id);

    if (!category)
      return res.status(404).json({ error: "Category not found" });

    await category.update({ name, color });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE Category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category)
      return res.status(404).json({ error: "Category not found" });

    await category.destroy();
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
