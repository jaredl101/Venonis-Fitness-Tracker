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

// router.get('/:id', rejectUnauthenticated, (req, res) => {
//   console.log(`In GET /api/exercise/ID`);
//   let id = req.params.id;
//   const queryText = `SELECT * FROM "exercise" WHERE id=$1`;
//   pool
//     .query(queryText, [id])
//     .then((result) => {
//       res.send(result.rows);
//     })
//     .catch((error) => {
//       console.log('Error GET /api/exercise/ID', error)
//       res.sendStatus(500);
//     });
// });

router.get('/:name', rejectUnauthenticated, (req, res) => {
  console.log(`In GET /api/exercise/name`);
  let name = req.params.name;
  console.log("FUCK", name);
  const queryText = `SELECT id FROM "exercise" WHERE exercise_name=$1`;
  pool
    .query(queryText, [name])
    .then((result) => {
      console.log(`xxx ${result.rows}`);
      //console.log(`xxx ${result.data}`);
      console.log(`xxx ${result}`);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('Error GET /api/exercise/name', error)
      res.sendStatus(500);
    });
});

module.exports = router;