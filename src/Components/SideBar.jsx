import React, { useEffect, useState } from 'react';
import './SideBar.css'; 
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchAndFilterMovies, moviesAction } from '../Redux/Store/movies-slice';

export default function SideBar() {
  const[searchParams, setSearchParams] = useSearchParams();
  const [selectedRatings, setSelectedRatings] = useState([]);
  const dispatch = useDispatch();

  

  const addNewQueryParam  = (key, value) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set(key, value);
    setSearchParams(newSearchParams);
    dispatch(moviesAction.sortMoviesData(value));
  }

  const handleRatingChange = (rating) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    const ratings = searchParams.getAll("rating");

    if (ratings.includes(rating)) {
      // Remove the rating if it already exists
      newSearchParams.delete("rating");
      ratings.filter((r) => r !== rating).forEach((r) => newSearchParams.append("rating", r));
    } else {
      // Add the new rating
      newSearchParams.append("rating", rating);
    }

    if(selectedRatings.includes(Number(rating))){
      setSelectedRatings(selectedRatings.filter(rate => rate !== Number(rating)));
    }
    else{
      setSelectedRatings([...selectedRatings, Number(rating)])
    }

    setSearchParams(newSearchParams);
    const ratingsData = newSearchParams.getAll("rating");
    dispatch(fetchAndFilterMovies(ratingsData));
  };

  const handleSortChange = (order) => {
    addNewQueryParam("order", order);
  }

 

  useEffect(() => {
    const isRatingEmp = !searchParams.getAll("rating").length > 0;
    if(isRatingEmp){
      setSelectedRatings([]);
    } 
  }, [searchParams]);

  return (
    <div className="sidebar">
      <div className="ratings">
      <h3>Filter by Rating</h3>
        {[1, 2, 3, 4, 5].map((num) => (
          <div key={num} className="rating">
            <input type="checkbox"  checked={selectedRatings.includes(num)}  onChange={() => handleRatingChange(num.toString())}/>
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`star ${index < num ? 'black-star' : ''}`}
              >
                ★
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="sorting">
      <h3>Sort By Year</h3>
        <div className="sort-option">
        <input
            type="radio"
            name="sortOrder"
            value="asc"
            checked={searchParams.get("order") === "asc"}
            onChange={() => handleSortChange('asc')}
          />
          <label>Ascending</label>
        </div>
        <div className="sort-option">
        <input
            type="radio"
            name="sortOrder"
            value="asc"
            checked={searchParams.get("order") === "desc"}
            onChange={() => handleSortChange('desc')}
          />
          <label>Descending</label>
        </div>
      </div>
    </div>
  );
}
