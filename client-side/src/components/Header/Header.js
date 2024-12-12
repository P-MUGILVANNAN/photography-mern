import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { photographyContext } from "../../App";
import "./Header.css";

const Header = () => {
  const { loggedInUserData, setLoggedInUserData } = useContext(photographyContext);
  const navigate = useNavigate();

  useEffect(() => {
    // On page load, check if there's a JWT token in localStorage
    const token = localStorage.getItem("authToken");
    if (token) {
      // If token exists, set the user data from localStorage (if any)
      const storedUserData = JSON.parse(localStorage.getItem("loggedInUserData"));
      if (storedUserData) {
        setLoggedInUserData(storedUserData);
      }
    }
  }, [setLoggedInUserData]);

  // Logout function
  const handleLogout = () => {
    // Clear user data from context and localStorage
    setLoggedInUserData({});
    localStorage.removeItem("authToken");
    localStorage.removeItem("loggedInUserData");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="header-section">
      <div className="container">
        <div className="navbar">
          <div className="header-left-section">
            <Link to="/">[ELITE]</Link>
          </div>
          <div className="header-right-section">
            <Link to="/">Home</Link>
            <Link to="/orders">Orders &nbsp; &nbsp; </Link>
            {/* If the user is logged in, show 'Logout' link */}
            {loggedInUserData._id ? (
              <>
                <span onClick={handleLogout} style={{ cursor: "pointer" }}>Logout</span>
                <Link to="/add-new-service">Add Service</Link>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
