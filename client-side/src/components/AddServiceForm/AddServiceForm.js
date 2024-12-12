import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddServiceForm.css";

const AddServiceForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    img: "",
    price: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const formDataHandler = async (e) => {
    e.preventDefault();

    // Reset messages on every submission
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/services/addService`,
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );
      const data = await response.json();

      // Check the response for success
      if (data.success) {
        // Display success message
        setSuccessMessage("Service added successfully!");
        
        // Redirect to home page after a delay
        setTimeout(() => {
          navigate("/"); // Navigate to the home page after success
        }, 2000);  // 2-second delay
      } 
    } catch (err) {
      console.error(err);
      setErrorMessage("An error occurred. Please try again.");
    }

    // Reset the form data
    setFormData({
      title: "",
      description: "",
      img: "",
      price: "",
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="add-service-form-section">
      <div className="container">
        <div className="add-service-form">
          <h3>Add New Service</h3>
          <form id="add-service-form" onSubmit={formDataHandler}>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Service Title"
              required
            />
            <input
              type="text"
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Service Description"
              required
            />
            <input
              type="text"
              id="img"
              value={formData.img}
              onChange={(e) =>
                setFormData({ ...formData, img: e.target.value })
              }
              placeholder="Service Image Online Link"
              required
            />
            <input
              type="number"
              id="price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              placeholder="Service Price"
              required
            />
            <input type="submit" value="Submit" />
          </form>

          {/* Conditionally render success or error messages */}
          {successMessage && (
            <div className="message success">
              <p>{successMessage}</p>
            </div>
          )}
          {errorMessage && (
            <div className="message error">
              <p>{errorMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddServiceForm;
