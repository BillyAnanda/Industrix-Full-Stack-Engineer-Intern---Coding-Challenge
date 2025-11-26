// Import package
const express = require("express");
const cors = require("cors");

// Import database & routes
const { sequelize } = require("./models");
const categoryRoutes = require("./routes/categoryRoutes");
const todoRoutes = require("./routes/todoRoutes");

// Create express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/categories", categoryRoutes);
app.use("/api/todos", todoRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("Industrix Backend Running...");
});

// Test database connection
sequelize
  .authenticate()
  .then(() => console.log("PostgreSQL connected!"))
  .catch((err) => console.error("Connection error:", err));

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
