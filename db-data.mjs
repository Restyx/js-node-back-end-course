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
  try {
    const query = {
      name: "create-user",
      text: "INSERT INTO users(name, age) VALUES($1, $2);",
      values: [user.name, user.age],
    };

    const result = await pool.query(query);
    return result.rowCount > 0;
  } catch (error) {
    console.log("Error while executing query:", error);
  }
}

export async function getUserById(userId) {
  try {
    const query = {
      name: "get-user",
      text: "SELECT id, name, age FROM users WHERE id = $1;",
      values: [userId],
    };

    const result = await pool.query(query);
    return result.rows[0];
  } catch (error) {
    console.log("Error while executing query:", error);
  }
}

export async function updateUser(userId, updatedData) {
  try {
    let parsedValues = [];
    for (const [key, value] of Object.entries(updatedData)) {
      parsedValues.push(`${key} = ${key === "age" ? value : `'${value}'`}`);
    }

    const query = {
      name: "update-user",
      text: `UPDATE users SET ${parsedValues.toString()} WHERE id = ${userId};`,
    };

    const result = await pool.query(query);
    return result.rowCount > 0;
  } catch (error) {
    console.log("Error while executing query:", error);
  }
}

export async function deleteUser(userId) {
  try {
    const query = {
      name: "delete-user",
      text: "DELETE FROM users WHERE id = $1;",
      values: [userId],
    };

    const result = await pool.query(query);
    return result.rowCount > 0;
  } catch (error) {
    console.log("Error while executing query:", error);
  }
}
