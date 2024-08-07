// Header.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css'; 

export default function Header() {
  return (
    <header className="header">
      <h1 className="heading">Movie Library</h1>
      <nav className="nav">
        <NavLink to="/" className="nav-link" activeClassName="active-link">Home</NavLink>
        <NavLink to="/login" className="nav-link" activeClassName="active-link">Login</NavLink>
      </nav>
    </header>
  );
}
