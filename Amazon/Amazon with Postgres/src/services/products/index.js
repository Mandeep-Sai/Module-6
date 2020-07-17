const express = require("express");
const productModel = require("./schema");
const q2m = require("query-to-mongo");
const db = require("../db");

//

//

const router = express.Router();

router.get("/", async (req, res) => {
  // getting values from Query String ?offset=10 etc
  // OR setting a default value
  const order = req.query.order || "asc";
  const offset = req.query.offset || 0;
  const limit = req.query.limit || 10;

  // removing them from Query since otherwise I'll automatically filter on them
  delete req.query.order;
  delete req.query.offset;
  delete req.query.limit;

  let query = "SELECT * FROM products ";

  const params = [];
  for (queryParam in req.query) {
    params.push(req.query[queryParam]);

    if (params.length === 1)
      query += `WHERE ${queryParam} = $${params.length} `;
    else query += ` AND ${queryParam} = $${params.length} `;
  }

  query += " ORDER BY _id " + order;

  params.push(limit);
  query += ` LIMIT $${params.length} `;
  params.push(offset);
  query += ` OFFSET $${params.length}`;
  console.log(query);
  const response = await db.query(query, params);
  res.send(response.rows);
});

router.get("/:id", async (req, res) => {
  const response = await db.query(`SELECT * FROM products WHERE _id=$1`, [
    req.params.id,
  ]);
  if (response.rowCount === 0) return res.status(404).send("Not Found");
  res.send(response.rows[0]);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const response = await db.query(
    `INSERT INTO products (name, description, brand, imageurl,category,price) 
                                       Values ($1, $2, $3, $4,$5,$6)
                                       RETURNING *`,
    [
      req.body.name,
      req.body.description,
      req.body.brand,
      req.body.imageurl,
      req.body.category,
      req.body.price,
    ]
  );
  //console.log(response);
  res.send(response.rows[0]);
});

router.put("/:id", async (req, res) => {
  try {
    let content = [];
    let query = "UPDATE products SET ";
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
  const response = await db.query(`DELETE FROM products WHERE _id = $1`, [
    req.params.id,
  ]);

  if (response.rowCount === 0) return res.status(404).send("Not Found");

  res.send("OK");
});

module.exports = router;
