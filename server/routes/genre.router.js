const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res)=> {
  const sqlQuery = `
    SELECT * FROM genres;
  `
  pool.query(sqlQuery)
      .then(dbRes=> {
        console.log('all genres from db:',dbRes.rows);
        // all genres from db: [
        //   { id: 1, name: 'Adventure' },
        //   { id: 2, name: 'Animated' }, {}...]
        res.send(dbRes.rows)
      }).catch(err => {
        console.log('error in GET /api/genre',err);
        res.sendStatus(500)
      })
})


router.get('/:id', (req, res) => {
  const movieId = req.params.id;

  const sqlQuery = `
    SELECT name FROM genres
      INNER JOIN movies_genres
          ON genres.id = movies_genres.genre_id
      INNER JOIN movies
          ON movies_genres.movie_id = movies.id
      WHERE movies.id = $1;
    `
  const sqlValues = [movieId];
  pool.query(sqlQuery, sqlValues)
      .then( dbRes=> {
        // console.log(dbRes.rows);
        // [ { name: 'Adventure' }, { name: 'Biographical' }, { name: 'Comedy' } ]
        res.send(dbRes.rows);
      }).catch(err => {
        console.log('error in GET /api/genre/:id',err);
        res.sendStatus(500)
      })
});

module.exports = router;