import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieItem from './MovieItem';
import './MovieList.css';

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    return (
        <main>
            <h1>MovieList</h1>
            <ul className="movies">
                {movies.map(movie => {
                    return (
                        <MovieItem key={movie.id} movie = { movie }/>
                    );
                })}
            </ul>
        </main>

    );
}

export default MovieList;