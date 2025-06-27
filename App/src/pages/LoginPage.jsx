import React, { useState } from "react";
import axios from "axios";
import "../styles.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
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
        "http://localhost:4444/api/auth/login",
        formData
      );
      setMessage(response.data.message);

      if (response.status === 200) {
        const token = response.data.token;
        sessionStorage.setItem("id", response.data._id);
        sessionStorage.setItem("authToken", token);
        navigate("/");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Błąd logowania");
    }
  };

  return (
    <>
      <body className="auth">
        <div className="container">
          <div className="form-container">
            <h1>Logowanie</h1>
            <form onSubmit={handleSubmit}>
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
                  required
                />
              </div>
              Nie masz konta?{" "}
              <a href="http://localhost:5173/register">Zarejestruj się</a>
              <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
          </div>
        </div>
      </body>
    </>
  );
};

export default LoginPage;
