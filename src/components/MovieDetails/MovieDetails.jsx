// MUI imports:
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
        // 👆 pulls the id parameter used to route to the detail page

import './MovieDetails.css'


export default function MovieDetails(){
    const dispatch = useDispatch();
    const params = useParams();
    const movieDetails = useSelector(store => store.movieDetails);
    // send requests to index.js to retrieve:    
        // 1. all the data from the movies table for given id
        // 2. all the genres for the movie
    const movieId  = Number(params.id);
    useEffect(()=> {
        dispatch({
            type: 'SAGA_GET_DETAILS',
            payload: movieId
        })
        return()=> {
            dispatch({
                type: 'CLEAR_DETAILS'
            })
        }
    },[movieId])
    // if 👆 changes, then the return function will run which clears the reducer so there is no previous data when the page is loaded for another id. 
    // console.log(movieDetails);
    return(
        <div className="detailCard">
            <Card  sx={{ display: 'flex'}}>
                <Box className="poster" sx={{ display: 'flex', flexDirection: 'column'}}>
                <img src={movieDetails.poster}/>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h4">
                        {movieDetails.title}
                    </Typography>
                    <Typography className="detailsText" variant="subtitle1" color="text.secondary" component="div">
                        {movieDetails.description}
                    </Typography>
                    <Typography className="genres" variant="h6" color="text.secondary" component="div">
                        Genres: {}
                    </Typography>
                    </CardContent>
                </Box>
            </Card>
        </div>
    )
}