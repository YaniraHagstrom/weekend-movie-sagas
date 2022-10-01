// MUI imports:
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import './MovieList.css';

import { useHistory } from 'react-router-dom';

export default function MovieItem({ movie }){
    const history = useHistory();
    const getDetails = ()=> {
        history.push(`/details/${movie.id}`);
    }


    return(
        <Card sx={{ maxWidth: 250}}>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} gutterBottom variant="h5" component="div">
                {movie.title}
                </Typography>
                <img 
                    type="button" 
                    src={movie.poster}
                    onClick={getDetails}
                    />
            </CardContent>
        </Card>
    )
}