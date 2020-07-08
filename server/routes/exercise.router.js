const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('In GET /api/exercise/');
  pool
    .query(`SELECT * from "exercise" ORDER by exercise_name ASC`)
    .then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      console.log(`Error GET /api/exercise`, error);
      res.sendStatus(500);

    })
});

router.get('/:id', rejectUnauthenticated, (req, res) => {
  console.log(`In GET /api/exercise/ID`);
  let id = req.params.id;
  const queryText = `SELECT * FROM "exercise" WHERE id=$1`;
  pool
    .query(queryText, [id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('Error GET /api/exercise/ID', error)
      res.sendStatus(500);
    });
});


module.exports = router;