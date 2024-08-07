import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './MovieDetail.css';
import Header from '../Components/Header';

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("usertoken");

  if(!token){
    navigate("/login");
  }

  useEffect(() => {
   
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}/movies/${id}`);
        const result = await response.json();
        setMovie(result);
        console.log(result);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (<>
    <Header/>
    <div className="movie-detail-container">
      <h3 className="movie-detail-id">ID: {id}</h3>
      <img src={movie.Poster} alt={movie.Title} className="movie-detail-poster" />
      <h2 className="movie-detail-title">{movie.Title}</h2>
      <p className="movie-detail-year">Release Year: {movie.Year}</p>
      <p className="movie-detail-type">Type: {movie.Type}</p>
      <p className="movie-detail-rating">Rating: {[...Array(movie.rating)].map((_, index) => (
              <span
                key={index}
                className="star black-star"
              >
                ★
              </span>
            ))}</p>
    </div>
    </>
  );
}

