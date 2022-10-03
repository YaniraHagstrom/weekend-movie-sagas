import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';


// -- Saga functions -- //
function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });
        
    } catch {
        console.log('get all error');
    }
    
}

function* getMovieDetails(action){
    const movieId = action.payload;
    try{
        const movieDetails = yield axios({
            method: 'GET',
            url: `/api/movie/${movieId}`
        })
        yield put({
            type: 'SET_MOVIE_DETAILS',
            payload: movieDetails.data
        })
    }catch {
        console.log('get details error');
    }
}

function* getMovieGenres(action){
    const movieId = action.payload;
    try{ const movieGenres = yield axios({
        method: 'GET',
        url: `/api/genre/${movieId}`
    })
        yield put({
            type: 'SET_GENRES',
            payload: movieGenres.data
        })

    }catch {
        console.log('get genres error');
    }
}

function* getAllGenres(){
    try{
        const allGenres = yield axios({
            method: 'GET',
            url: '/api/genre'
        })
        yield put({
            type: 'SET_ALL_GENRES',
            payload: allGenres.data
        })
    }catch {
        console.log('get all genres error');
    }
}



// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('SAGA_GET_DETAILS', getMovieDetails);
    yield takeEvery('SAGA_GET_GENRES', getMovieGenres);
    yield takeEvery('SAGA_GET_ALL_GENRES', getAllGenres);
}

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
            default:
                return state;
            }
}

const movieDetails = (state = {}, action)=> {
    switch(action.type){
        case 'SET_MOVIE_DETAILS':
            return action.payload
        case 'CLEAR_DETAILS':
            return {};
        default:
            return state;
    }
}
        
const allGenres = (state=[], action)=> {
    switch (action.type){
        case 'SET_ALL_GENRES':
            return action.payload
        default:
            return state;
    }
}

//data from server: [ { name: 'Adventure' }, { name: 'Biographical' }, { name: 'Comedy' } ]
const genres = (state = [], action) => {
    const genres = action.payload;
    // convert array of objects to an array with just the genre names:
    
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        case 'CLEAR_GENRES':
            return [];
        default:
            return state;
        }
}
        
// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

    // Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        movieDetails,
        allGenres
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
