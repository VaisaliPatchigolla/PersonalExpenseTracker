import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Styles.css';

const Home = () => {
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [showRegisterDropdown, setShowRegisterDropdown] = useState(false);

  const toggleLoginDropdown = () => {
    setShowLoginDropdown(!showLoginDropdown);
    setShowRegisterDropdown(false); // Close register dropdown when clicking on login
  };

  const toggleRegisterDropdown = () => {
    setShowRegisterDropdown(!showRegisterDropdown);
    setShowLoginDropdown(false); // Close login dropdown when clicking on register
  };

  return (
    <div>
      <nav className="navbarhome">
        <div>
          <a href="/" className="navbar-brand">
            Personal-Expenses-System
          </a>
        </div>
        <div className="dropdowns">
          <div className="dropdown">
            <button onClick={toggleRegisterDropdown} className="button-logout">
              Register
            </button>
            {showRegisterDropdown && (
              <div className="dropdown-content">
                <Link to="/register/admin" className="dropdown-link">
                  As Admin
                </Link>
                <Link to="/register/user" className="dropdown-link">
                  As User
                </Link>
              </div>
            )}
          </div>
          <div className="dropdown">
            <button onClick={toggleLoginDropdown} className="button-logout">
              Login
            </button>
            {showLoginDropdown && (
              <div className="dropdown-content">
                <Link to="/login/admin" className="dropdown-link">
                  As Admin
                </Link>
                <Link to="/login/user" className="dropdown-link">
                  As User
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className='container'>
        <div className='image'>
          <img
            src="https://assets.gqindia.com/photos/608c135f6e6a489a62cd254d/master/pass/Apps%20for%20finance%20management.jpg"
            alt="Expense Tracker"
          />
        </div>
        
      </div>
    </div>
  );
};

export default Home;
