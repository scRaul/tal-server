require("dotenv").config();
const Sequelize = require("sequelize");

const dbName = process.env.DB_SCHEMA;
const dbUser = process.env.DB_USER;
const dbPswd = process.env.DB_PSWD;
const dbHost = process.env.DB_HOST;

const sequelize = new Sequelize(dbName, dbUser, dbPswd, {
  dialect: "mysql",
  host: dbHost,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000, // maximum time, in milliseconds, that pool will try to get connection before throwing error
    idle: 10000, // maximum time, in milliseconds, that a connection can be idle before being released
  },
});

module.exports = sequelize;

// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: proccess.env.DB_USER,
//   database: process.env.DB_SCHEMA,
//   password: process.env.DB_PSWD,
// });

// module.exports = pool.promise();
