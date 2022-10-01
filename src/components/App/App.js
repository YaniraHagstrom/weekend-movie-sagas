import {HashRouter as Router, Route, Redirect} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MovieDetails from '../MovieDetails/MovieDetails';

function App() {

  // MUI Color Theme:
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1B2021',
        contrastText: '#DAF5FF',
      },
      secondary: {
        main: '#028090',
        contrastText: '#FFFFFF',
      },
      background: {
        card: '#cce3de',
      }
    },
  });





  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <ThemeProvider theme={theme}>
        <Router>        
          <Redirect from="/" to="/movielist" />
          <Route path="/movielist" exact>
            <MovieList />
          </Route>
          {/* <Route path="/details/:id" exact>
            <MovieDetails />
          </Route> */}

          {/* Add Movie page */}
        </Router>
      </ThemeProvider>
    </div>
  );
}


export default App;
