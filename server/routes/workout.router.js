const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('In GET /api/workout/');
  pool
    .query(`SELECT * from "workout" ORDER by id ASC`)
    .then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      console.log(`Error GET /api/workout`, error);
      res.sendStatus(500);

    })
});

// this route is for getting the most recent workout of an inidividual
router.get('/:userid', rejectUnauthenticated, (req, res) => {
  console.log(`In GET /api/workout/ID`);
  // SELECT MAX(id) FROM "workout" where user_id = 1;
  //let id = req.params.id;
  let userid = req.params.userid;
  const queryText = `SELECT MAX(id) FROM "workout" WHERE user_id=$1`;
  pool
    .query(queryText, [userid])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('Error GET /api/workout/ID', error)
      res.sendStatus(500);
    });
});


router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('In POST /api/workout/');
  let rating = req.body.rating
  let id = req.body.id
  let queryText = `INSERT INTO "workout" ("rating", "user_id")
                   VALUES ($1, $2);`;
  pool
    .query(queryText, [rating, id])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error POSTING /api/workout`, error);
      res.sendStatus(500);

    })
});
module.exports = router;