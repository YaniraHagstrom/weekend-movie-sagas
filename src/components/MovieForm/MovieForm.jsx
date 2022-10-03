// MUI imports:
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Genres from './Genres';

export default function MovieForm(){
    const [movie, setMovie] = useState({});


    return(
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
            <div>
                <TextField
                id="outlined-multiline-flexible"
                label="Title"
                // value={value}
                // onChange={handleChange}
                />
                <TextField
                id="outlined-textarea"
                label="Poster URL"
                />
            </div>
            <TextField
            id="outlined-multiline-static"
            label="Movie Description"
            multiline
            rows={8}
            />
            <Genres/>
        </Box>
    )

}