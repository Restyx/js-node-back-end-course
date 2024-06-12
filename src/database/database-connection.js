const pg = require("pg");

const { Pool } = pg;
const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function query(text, params, callback) {
  return pool.query(text, params, callback).catch((error) => {
    console.log("Error while executing query:", error);
  });
}

// if it doesn't already exist, create default table
query("CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, age INT NOT NULL);");

module.exports = query;
