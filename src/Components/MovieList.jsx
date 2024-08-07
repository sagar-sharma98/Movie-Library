import React from "react";
import "./MovieList.css";
import MovieCard from "./MovieCard";

export default function MovieList({ moviesData }) {
  return (
    <div className="card-grid">
      {moviesData.length > 0 ? (
        moviesData.map((movie, index) => (
          <MovieCard key={index} className="card" movie={movie} />
        ))
      ) : (
        <p>Please wait...</p>
      )}
    </div>
  );
}
