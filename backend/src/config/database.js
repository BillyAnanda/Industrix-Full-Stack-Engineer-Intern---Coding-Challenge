const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("industrix_db", "postgres", "billyc123", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = sequelize;
