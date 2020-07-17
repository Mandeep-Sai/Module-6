const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/:productid", async (req, res) => {
  const response = await db.query(
    `SELECT name, brand, price as unitary_price, COUNT(*) As quantity, COUNT(*) * price as total
                                     FROM carts JOIN products ON carts.productid = products._id
                                     WHERE productid = $1
                                     GROUP BY products.name
                                     `,
    [req.params.productid]
  );

  res.send(response.rows);
});

router.post("/", async (req, res) => {
  const response = await db.query(
    `INSERT INTO carts (productid) values ($1) RETURNING *`,
    [req.body.productid]
  );
  res.send(response.rows[0]);
});

module.exports = router;
