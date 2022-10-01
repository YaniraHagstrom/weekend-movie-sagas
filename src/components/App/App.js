import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
        paper: '#F4F5F5',
      }
    },
  });





  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <ThemeProvider theme={theme}>
        <Router>        
          <Route path="/" exact>
            <MovieList />
          </Route>
          
          {/* Details page */}

          {/* Add Movie page */}
        </Router>
      </ThemeProvider>
    </div>
  );
}


export default App;
