var express = require("express");
var query = require("../database/database-connection.js");

var router = express.Router();

router
  .route("/")
  .get(async function (req, res, next) {
    const queryResult = await query("Select id, name, age FROM users;");
    res.send(queryResult.rows);
  })
  .post(async function (req, res, next) {
    if (req.body.name && req.body.age) {
      const queryResult = await query(
        "INSERT INTO users(name, age) VALUES($1, $2);",
        [req.body.name, req.body.age]
      );
      res.send("user added");
    } else {
      res.send("name and age are required!");
    }
  });

router
  .route("/:id(d+)")
  .get(async function (req, res, next) {
    const queryResult = await query(
      "SELECT id, name, age FROM users WHERE id = $1;",
      [req.params.id]
    );
    res.json(queryResult.rows[0]);
  })
  .put(async function (req, res, next) {
    if (req.body.name && req.body.age) {
      const queryResult = await query(
        "UPDATE users SET name = $1, age = $2 WHERE id = $3;",
        [req.body.name, req.body.age, req.params.id]
      );
      res.send("user updated");
    } else {
      res.send("name and age are required!");
    }
  })
  .delete(async function (req, res, next) {
    const queryResult = await query("DELETE FROM users WHERE id = $1;", [
      req.params.id,
    ]);
    res.send("user deleted");
  });

module.exports = router;
