const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

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
        console.log('error in GET /api/movie/:id',err);
        res.sendStatus(500)
      })
});

module.exports = router;