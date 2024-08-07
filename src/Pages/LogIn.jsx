import React, { useState } from 'react';
import './LogIn.css';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const loginHandler = (e) => {
    e.preventDefault();
    localStorage.setItem('usertoken', password);
    console.log("User token set in local storage:", password);
    navigate("/");

  };

  return (<>
    <Header/>
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-heading">Log In</h2>
        <input
          type="email"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" onClick={loginHandler}>
          Log In
        </button>
      </div>
    </div>
    </>
  );
}
