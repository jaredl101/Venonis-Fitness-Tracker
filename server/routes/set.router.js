const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('In GET /api/set/');
  pool
    .query(`SELECT * from "set" ORDER by id ASC`)
    .then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      console.log(`Error GET /api/set`, error);
      res.sendStatus(500);

    })
});


router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('In POST /api/set/');
  let item = req.body.item;
  let workoutId = req.body.workoutId;
  let exerciseInstanceId = req.body.exerciseInstanceId;
  let queryText = `INSERT INTO "set" ("set_number", "rep", "weight", "workout_id", "exercise_instance_id")
                   VALUES ($1, $2, $3, $4, $5);`;
  pool
    .query(queryText, [item.set, item.rep, item.weight, workoutId, exerciseInstanceId])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error POSTING /api/set`, error);
      res.sendStatus(500);

    })
});


module.exports = router;