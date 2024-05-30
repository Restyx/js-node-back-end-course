import pg from "pg";

// database parameters
const dbConfig = {
    host: "localhost",
    database: "postgres",
    user: "postgres",
    password: "admin",
    port: 5432,
  };

const { Pool } = pg;
const pool = new Pool(dbConfig);

// if it doesn't already exist, create default table
try {
  await pool.query(
    "CREATE TABLE IF NOT EXISTS users (id BIGSERIAL PRIMARY KEY, name TEXT NOT NULL, age INT NOT NULL);"
  );
} catch (error) {
  console.log("Error while executing query:", error);
}

export { pool };
