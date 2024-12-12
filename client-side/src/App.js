import React, { createContext, useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Orders from "./components/Orders/Orders";
import ServiceDetail from "./components/ServiceDetail/ServiceDetail";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import Footer from "./components/Footer/Footer";
import {
  Route,
  Navigate,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import "./App.css";
import Checkout from "./components/Checkout/Checkout";
import AddServiceForm from "./components/AddServiceForm/AddServiceForm";

export const photographyContext = createContext();

function App() {
  const [registeredUser, setRegisteredUser] = useState(true);
  const [loggedInUserData, setLoggedInUserData] = useState({});
  const [services, setServices] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Check if JWT is available in localStorage and set logged-in user data
  useEffect(() => {
    const storedUserData = localStorage.getItem("loggedInUserData");
    if (storedUserData) {
      setLoggedInUserData(JSON.parse(storedUserData));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    // Store user data in localStorage to persist login state
    localStorage.setItem("loggedInUserData", JSON.stringify(userData));
    setLoggedInUserData(userData);
  };

  const handleLogout = () => {
    // Clear user data from context and localStorage
    localStorage.removeItem("loggedInUserData");
    setLoggedInUserData({});
  };

  return (
    <photographyContext.Provider
      value={{
        registeredUser,
        setRegisteredUser,
        loggedInUserData,
        setLoggedInUserData,
        services,
        setServices,
        orders,
        setOrders,
        loading,
        setLoading,
        handleLogin,
        handleLogout,
      }}
    >
      <BrowserRouter>
        {/* Header/Navbar Section */}
        <Header handleLogout={handleLogout} />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/orders"
              element={
                loggedInUserData?._id ? <Orders /> : <Navigate to="/login" />
              }
            />
            <Route path="/service-detail/:serviceId" element={<ServiceDetail />} />
            <Route path="/add-new-service" element={<AddServiceForm />} />
            <Route
              path="/checkout/:serviceId"
              element={
                loggedInUserData?._id ? <Checkout /> : <Navigate to="/login" />
              }
            />
            <Route path="/login" element={<Login handleLogin={handleLogin} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
        {/* Footer Section */}
        <Footer />
      </BrowserRouter>
    </photographyContext.Provider>
  );
}

export default App;
