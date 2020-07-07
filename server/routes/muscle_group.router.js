const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    console.log('In GET /api/muscle_group/');
    pool
    .query(`SELECT * from "muscle_group" ORDER by name ASC`)
    .then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      console.log(`Error GET /api/muscle_group`, error);
      res.sendStatus(500);
      
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;