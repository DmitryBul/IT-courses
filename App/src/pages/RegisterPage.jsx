import React, { useState } from "react";
import axios from "axios";
import "../styles.css";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4444/api/auth/register",
        formData
      );
      setMessage(response.data.message);
      if (response.status === 201) {
        const token = response.data.token;
        sessionStorage.setItem("id", response.data._id);
        sessionStorage.setItem("authToken", token);
        navigate("/");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Błąd rejestracji");
    }
  };

  return (
    <>
      <body className="auth">
        <div className="containerR">
          <div className="form-containerR">
            <h1>Rejestracja</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Firstname:</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  pattern="[A-Za-z]+"
                  title="Tylko litery"
                  required
                />
              </div>
              <div>
                <label>Secondname:</label>
                <input
                  type="text"
                  name="secondName"
                  value={formData.secondName}
                  onChange={handleChange}
                  pattern="[A-Za-z]+"
                  title="Tylko litery"
                  required
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  minLength="6"
                  required
                />
              </div>
              Masz konto? <a href="http://localhost:5173/login">Zaloguj się</a>
              <button type="submit">Rejestracja</button>
            </form>
            {message && <p>{message}</p>}
          </div>
        </div>
      </body>
    </>
  );
};

export default RegisterPage;
