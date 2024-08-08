import React from 'react';
import './MovieCard.css'; 
import { useNavigate } from 'react-router-dom';

export default function MovieCard({movie}) {
  const navigate = useNavigate();
  
  return (
    <div className="movie-card">
      <img src={movie.Poster} alt="movie_poster" className="movie-image" onClick={() => navigate(`/movie/${movie.id}`)}/>
      <h3 className="movie-name">{movie.Title}</h3>
      <p className="movie-year"> {movie.Year}</p>
      <p className="movie-type"> {movie.Type}</p>
      <p className="movie-rating">{movie.rating}</p>
    </div>
  );
}
