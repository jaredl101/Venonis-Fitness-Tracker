const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// this route is for getting the most recent workout of an inidividual
router.get('/:id', rejectUnauthenticated, (req, res) => {
  console.log(`In GET /api/bodyweight/ID`);
  let id = req.params.id;
  //console.log('In bodyweight router, id is:', id)
  const queryText = `SELECT * FROM "bodyweight_history" WHERE user_id=$1 ORDER by date ASC`;
  pool
    .query(queryText, [id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('Error GET /api/bodyweight/ID', error)
      res.sendStatus(500);
    });
});


router.post('/', rejectUnauthenticated, (req, res) => {
  // route to post a new bodyweight entry
  console.log('In POST /api/bodyweight/');
  let item = req.body;
  console.log('ITEM IS: ', item);
  let queryText = `INSERT INTO "bodyweight_history" ("date", "user_bodyweight", "user_id")
                   VALUES ($1, $2, $3);`;
  pool
    .query(queryText, [item.date, item.weight, item.id])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error POSTING /api/bodyweight`, error);
      res.sendStatus(500);

    })
});

router.delete('/:id', (req, res) => {
  // This route will delete their most recent entry that matches their user_id
  const queryText = `DELETE FROM "bodyweight_history" 
                    WHERE user_id=$1 and id in (
                    SELECT id 
                    FROM "bodyweight_history" 
                    ORDER BY id desc
                    LIMIT 1
                    )`
                    
  pool.query(queryText, [req.params.id])
    .then(() => { res.sendStatus(200); })
    .catch((error) => {
      console.log('Error deleting bodyweight from server', error);
      res.sendStatus(500);
    });
});

module.exports = router;