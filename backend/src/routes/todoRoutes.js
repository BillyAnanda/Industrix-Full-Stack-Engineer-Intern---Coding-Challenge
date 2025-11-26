const express = require("express");
const TodoController = require("../controllers/todoController");
const router = express.Router();

router.get("/", TodoController.getAll);
router.get("/:id", TodoController.getById);
router.post("/", TodoController.create);
router.put("/:id", TodoController.update);
router.delete("/:id", TodoController.delete);
router.patch("/:id/toggle", TodoController.toggleComplete);

module.exports = router;
