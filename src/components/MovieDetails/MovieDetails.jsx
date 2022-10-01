// MUI imports:
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
        // 👆 pulls the id parameter used to route to the detail page


export default function MovieDetails(){
    const dispatch = useDispatch();
    const params = useParams();
    // send requests to index.js to retrieve:    
        // 1. all the data from the movies table for given id
        // 2. all the genres for the movie
    const movieId  = params.id;
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

    return(
        <Card sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                    Live From Space
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    Mac Miller
                </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                </Box>
            </Box>
        </Card>
    )
}