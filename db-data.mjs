import { pool } from "./db-connection.mjs";

export async function getUsers() {
  const query = {
    name: "get-users",
    text: "Select id, name, age FROM users;",
  };
  const result = await pool.query(query);
  return result.rows;
}

export async function createUser(user) {
  const query = {
    name: "create-user",
    text: "INSERT INTO users(name, age) VALUES($1, $2);",
    values: [user.name, user.age],
  };

  const result = await pool.query(query);
  return result.rowCount;
}

export async function getUserById(userId) {
  const query = {
    name: "get-user",
    text: "SELECT id, name, age FROM users WHERE id = $1;",
    values: [userId],
  };

  const result = await pool.query(query);
  return result.rows[0];
}

export async function updateUser(userId, updatedData) {
  let parsedValues = [];
  for (const [key, value] of Object.entries(updatedData)) {
    parsedValues.push(`${key} = ${key === 'age' ? value : `'${value}'`}`)
  }

  const query = {
    name: "update-user",
    text: `UPDATE users SET ${parsedValues.toString()} WHERE id = ${userId}`,
  };

  const result = await pool.query(query);
  return result.rowCount;
}

export async function deleteUser(userId) {
  const query = {
    name: "delete-user",
    text: "DELETE FROM users WHERE id = $1;",
    values: [userId],
  };

  const result = await pool.query(query);
  return result.rowCount;
}