// MUI Imports:
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


export default function Genres(){
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch({
            type: 'SAGA_GET_ALL_GENRES'
        })
    }, [])
    
    const [genre, setGenre] = useState('');
    const allGenres = useSelector(store=> store.allGenres);
    console.log(allGenres.map(genre=> genre.name))

    return(
        <>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                >
            </Box>
            <TextField
                id="outlined-select-genre"
                select
                label="Select"
                value={genre}
                onChange={e => setGenre(e.target.value)}
                helperText="Please select a category"
                >
                {allGenres.map((genre) => (
                    <MenuItem key={genre.id} value={genre.name}>
                    </MenuItem>
                ))}
            </TextField>
        </>
    )
}