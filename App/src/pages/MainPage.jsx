import React, { useState } from "react";
import SkeletonCourse from "../components/SkeletonCourse";
import Header from "../components/Header";
import { Button, Container, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const MainPage = () => {
  const [text, setText] = useState({
    title: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSearchTextChange = (e) => {
    const { name, value } = e.target;
    setText({ ...text, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4444/courses/findCourses",
        text
      );
      setMessage(response.data.message);
      if (response.status === 200) {
        sessionStorage.setItem("serverData", JSON.stringify(response.data));
        navigate("/search");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Nie znaleziono");
    }
  };

  return (
    <>
      <Header />
      <Container>
        <div
          className="search"
          style={{
            marginTop: "30px",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <TextField
            id="outlined-basic"
            onChange={handleSearchTextChange}
            type="search"
            label="Wyszukaj"
            variant="outlined"
            name="title"
            fullWidth
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            endIcon={<SearchIcon />}
          >
            Wyszukaj
          </Button>
        </div>
        <h2 style={{ textAlign: "center", fontFamily: "Verdana" }}>
          Najlepsze kursy
        </h2>
      </Container>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="skeletonCourse">
          <SkeletonCourse />
        </div>
      </div>
    </>
  );
};

export default MainPage;
