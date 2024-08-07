
import {  createSlice } from "@reduxjs/toolkit";


export const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}/movies`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log(result);
      return result;
     
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  export const fetchAndFilterMovies = (ratings) => async (dispatch) => {
    const moviesData = await fetchData(); // Fetch movies data
    const filteredMovies = moviesData.filter((movie) =>
      ratings.includes(movie.rating.toString()) // Filter based on ratings
    );
    dispatch(moviesAction.addMovies(filteredMovies)); // Dispatch action to set filtered movies
  };
  


const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    isLoading: false,
    isError: false,
    movies: [],
  },

  reducers: {
    addMovies(state, action){
        state.movies = action.payload
    },

    loadingData(state, action){
        state.isLoading = action.payload;
    },

    sortMoviesData(state, action){
        if(action.payload === "asc"){
            state.movies = state.movies.sort((movie1, movie2) => movie1.Year - movie2.Year);
        }
        else{
            state.movies = state.movies.sort((movie1, movie2) => movie2.Year - movie1.Year);
        }
    },
  },

});

export const moviesAction = moviesSlice.actions;
export default moviesSlice;
