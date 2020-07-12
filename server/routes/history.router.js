const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('In GET /api/history/');
  pool
    .query(
      `SELECT workout.id, workout.date, workout.start_time, workout.end_time, exercise_instance.id, exercise.exercise_name, set.set_number, set.rep, set.weight
      FROM workout
      INNER JOIN exercise_instance ON exercise_instance.workout_id = workout.id
      INNER JOIN exercise ON exercise_instance.exercise_id = exercise.id
      INNER JOIN set ON set.exercise_instance_id = exercise_instance.id;`
    )
    .then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      console.log(`Error GET /api/history`, error);
      res.sendStatus(500);

    })
});
/*
```
To get a query with this info: Workout ID, Workout Date, Workout Start Time, Workout End Time, Exercise Instance ID, Exercise Name, Set Number, Set Rep, Set Weight
Run this query:
SELECT workout.id, workout.date, workout.start_time, workout.end_time, exercise_instance.id, exercise.exercise_name, set.set_number, set.rep, set.weight
FROM workout
INNER JOIN exercise_instance ON exercise_instance.workout_id = workout.id
INNER JOIN exercise ON exercise.exercise_id = exercise.id
INNER JOIN set ON set.exercise_instance_id = exercise_instance.id
```
*/
module.exports = router;