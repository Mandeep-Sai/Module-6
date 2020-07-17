const express = require("express");
const reviewModel = require("./schema");
const db = require("../db");

const router = express.Router();

router.get("/", async (req, res) => {
  const reviews = await reviewModel.find();
  res.send(reviews);
});

router.get("/:id", async (req, res) => {
  const response = await db.query(`SELECT * FROM reviews WHERE elementid=$1`, [
    req.params.id,
  ]);
  if (response.rowCount === 0) return res.status(404).send("Not Found");
  res.send(response.rows);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const response = await db.query(
    `INSERT INTO reviews (comment, rate, elementid) 
                                       Values ($1, $2, $3)
                                       RETURNING *`,
    [req.body.comment, req.body.rate, req.body.elementid]
  );
  //console.log(response);
  res.send(response.rows[0]);
});

router.put("/:id", async (req, res) => {
  try {
    let content = [];
    let query = "UPDATE reviews SET ";
    for (element in req.body) {
      content.push(req.body[element]);
      query +=
        (content.length > 1 ? ", " : "") + element + " = $" + content.length;
    }
    content.push(req.params.id);
    query += " WHERE _id = $" + content.length + " RETURNING *";
    //console.log(query);
    const result = await db.query(query, content);
    if (result.rowCount === 0) return res.status(404).send("Not Found");

    res.send(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  const response = await db.query(`DELETE FROM reviews WHERE _id = $1`, [
    req.params.id,
  ]);

  if (response.rowCount === 0) return res.status(404).send("Not Found");

  res.send("OK");
});

module.exports = router;
