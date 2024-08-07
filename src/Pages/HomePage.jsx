import React, { useEffect } from 'react';
import { NavLink, Outlet, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SideBar from '../Components/SideBar';
import './HomePage.css'; 
import { fetchData } from '../Redux/Store/movies-slice';
import { moviesAction } from '../Redux/Store/movies-slice';
import MovieList from '../Components/MovieList';
import Header from '../Components/Header';


export default function HomePage() {
  const moviesData = useSelector((state) => state.movies.movies);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
 
  const entries = searchParams.entries();
  console.log(entries);
  const queryParams = Object.fromEntries(searchParams.entries());
  const isQueryParamsEmpty = Object.keys(queryParams).length === 0;
  console.log(queryParams);

 

  useEffect(() => {

    const fetchMovies = async() => {
      if(isQueryParamsEmpty){
        const moviesData = await fetchData();
        console.log(moviesData);
        dispatch(moviesAction.addMovies(moviesData));
      }
    }

    fetchMovies();
    
  }, [searchParams]);

  return (
    <div className="homepage">
     <Header/>
      <Outlet/>
      
      <div className="main-content">
        <SideBar />
        <MovieList moviesData={moviesData}/>
        {/* <div className="card-grid">
          {moviesData.length > 0 ? moviesData.map((movie, index) => <MovieCard key={index} className="card" movie={movie} />) : <p>Please wait...</p>}
        </div> */}
      </div>
    </div>
  );
}
