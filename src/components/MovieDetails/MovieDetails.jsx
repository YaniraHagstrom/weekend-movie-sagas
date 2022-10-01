// MUI imports:
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
        // 👆 pulls the id parameter used to route to the detail page

import './MovieDetails.css';

export default function MovieDetails(){
    const dispatch = useDispatch();
    const params = useParams();
    const movieDetails = useSelector(store => store.movieDetails);
    const movieGenres = useSelector(store=> store.genres);
    console.log(movieGenres);

    // send requests to index.js to retrieve:    
        // 1. all the data from the movies table for given id
        // 2. all the genres for the movie
    const movieId  = params.id;
    useEffect(()=> {
        dispatch({
            type: 'SAGA_GET_DETAILS',
            payload: movieId
        })
        dispatch({
            type: 'SAGA_GET_GENRES',
            payload: movieId
        })
        return()=> {
            dispatch({
                type: 'CLEAR_DETAILS'
            })
            dispatch({
                type: 'CLEAR_GENRES'
            })
        }
    },[movieId])
    // if 👆 changes, then the return function will run which clears the reducer so there is no previous data when the page is loaded for another id. 
    console.log(movieDetails);
    return(
        <Card sx={{ display: 'flex' }}>
            <img src={movieDetails.poster}/>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h4">
                    {movieDetails.title}
                </Typography>
                <Typography className="detailsText" variant="subtitle1" color="text.secondary" component="div">
                    {movieDetails.description}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    Genres: 
                    <div className="genres">
                        {movieGenres.map(genre=> (
                            <p className="genre">{genre.name}</p>
                        ))}
                    </div>
                </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                </Box>
            </Box>
        </Card>
    )
}