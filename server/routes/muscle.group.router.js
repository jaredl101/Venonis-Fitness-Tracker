const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    console.log('In GET /api/muscle_group/');
    pool
    .query(`SELECT * from "muscle_group" ORDER by name ASC`)
    .then((result) => {
      res.sendStatus(200);
      res.send(result.rows);
    }).catch((error) => {
      console.log(`Error GET /api/muscle_group`, error);
      res.sendStatus(500);
      
    })
});

router.get('/:id', (req, res) => {
  console.log(`In GET /api/muscle_group/ID`);
  let id = req.params.id;
  const queryText = `SELECT * FROM "muscle_group" WHERE id=$1`;
  pool
    .query(queryText, [id])
    .then((result) => {
      res.sendStatus(200);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('Error GET /api/muscle_group/ID', error)
      res.sendStatus(500);
    });
});


module.exports = router;