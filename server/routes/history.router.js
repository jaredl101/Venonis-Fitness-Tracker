const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/:id', rejectUnauthenticated, (req, res) => {
  // This is what our history page shows
  // It is all the relevant information from all tables basically for that user id
  console.log('In GET /api/history/');
  let id = req.params.id;
  console.log(`id in history.router is: ${id}`);
  const queryText =
    ` SELECT workout.id, workout.date, workout.start_time, workout.end_time, exercise_instance.id, 
      exercise.exercise_name, exercise.description, set.set_number, set.rep, set.weight, set.id AS set_id
      FROM workout
      INNER JOIN exercise_instance ON exercise_instance.workout_id = workout.id
      INNER JOIN exercise ON exercise_instance.exercise_id = exercise.id
      INNER JOIN set ON set.exercise_instance_id = exercise_instance.id
      INNER JOIN "user" on "user".id = workout.user_id
      WHERE "user".id = $1
      ORDER BY workout.date ASC, set.set_number ASC;
    `
  pool
    .query(queryText, [id])
    .then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      console.log(`Error GET /api/history`, error);
      res.sendStatus(500);

    })
});


module.exports = router;

