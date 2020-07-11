const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('In GET /api/exercise_instance/');
  pool
    .query(`SELECT * from "exercise_instance" ORDER by id ASC`)
    .then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      console.log(`Error GET /api/workout`, error);
      res.sendStatus(500);

    })
});

// this route is for getting the most recent workout of an inidividual
router.get('/:id', rejectUnauthenticated, (req, res) => {
  console.log(`In GET /api/exercise_instance/ID`);
  // SELECT MAX(id) FROM "workout" where user_id = 1;
  //let id = req.params.id;
  let id = req.params.id;
  const queryText = `SELECT MAX(id) FROM "exercise_instance" WHERE workout_id=$1`;
  pool
    .query(queryText, [id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('Error GET /api/exercise_instance/ID', error)
      res.sendStatus(500);
    });
});


router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('In POST /api/exercise_instance/');
  console.log(req.body.item)
  let item = req.body;
  let workoutId = item.currentWorkoutId;
  let exerciseId = item.currentExerciseId.id;
  console.log(`In exercise.instance.router exercise id is: ${exerciseId}`);
  let queryText = `INSERT INTO "exercise_instance" ("workout_id", "exercise_id")
                   VALUES ($1, $2);`;
  pool
    .query(queryText, [workoutId, exerciseId])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error POSTING /api/exercise_instance`, error);
      res.sendStatus(500);

    })
});
module.exports = router;