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

router.get('/:name', rejectUnauthenticated, (req, res) => {
  // route for getting info on a single exercise
  console.log(`In GET /api/exercise/name`);
  let name = req.params.name;
  const queryText = `SELECT id FROM "exercise" WHERE exercise_name=$1`;
  pool
    .query(queryText, [name])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('Error GET /api/exercise/name', error)
      res.sendStatus(500);
    });
});

module.exports = router;