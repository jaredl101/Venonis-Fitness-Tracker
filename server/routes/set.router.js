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

router.get('/:id', rejectUnauthenticated, (req, res) => {
  console.log(`In GET /api/set/ID`);
  let id = req.params.id;
  const queryText = `SELECT * FROM "set" WHERE id=$1 ORDER by exercise_instance_id ASC`;
  pool
    .query(queryText, [id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('Error GET /api/muscle_group/ID', error)
      res.sendStatus(500);
    });
});

router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('In POST /api/set/');
  // let item = { name: this.state.name, currentExerciseId: '', currentWorkoutId: '',
  //  sets: [this.state.sets], userId: this.props.user.id }
  //          array^

  let item = req.body;
  console.log('In set router, item is,', item);
  let sets = item.sets;
  console.log('In set router, sets is,', sets);
  console.log(`Number of sets: ${sets.length}`);
  for(let i = 0; i < sets.length; i++){
    let queryText = `INSERT INTO "set" ("set_number", "rep", "weight", "workout_id", "exercise_instance_id")
                   VALUES ($1, $2, $3, $4, $5);`;
    pool
      .query(queryText, [i+1, sets[i].rep, sets[i].weight, item.currentWorkoutId, item.currentExerciseInstanceId])
      .then((result) => {
        res.sendStatus(201);
      })
      .catch((error) => {
        console.log(`Error POSTING /api/set #${sets[i+1]}`, error);
        res.sendStatus(500);

      })
  }

});


module.exports = router;