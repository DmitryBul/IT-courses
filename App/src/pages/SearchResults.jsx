import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Button, Container, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Media from "../components/Media";
import axios from "axios";

const SearchResults = () => {
  const [data, setData] = React.useState([]);
  const [text, setText] = useState({
    title: "",
  });
  const [message, setMessage] = useState("");
  const handleSearchTextChange = (e) => {
    const { name, value } = e.target;
    setText({ ...text, [name]: value });
  };

  useEffect(() => {
    const serverData = JSON.parse(sessionStorage.getItem("serverData"));
    if (serverData) {
      setData(serverData);
    }
  }, [text]);

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
        window.location.reload();
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
            display: "flex",
            marginTop: "30px",
            alignItems: "center",
            gap: 16,
          }}
        >
          <TextField
            id="outlined-basic"
            type="search"
            label="Wyszukaj"
            variant="outlined"
            name="title"
            onChange={handleSearchTextChange}
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
      </Container>
      <Container>
        <h2 style={{ textAlign: "center", fontFamily: "Verdana" }}>
          Znalezione kursy:
        </h2>
      </Container>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          className="skeletonCourse"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
            margin: "20px",
          }}
        >
          {data.map((item) => (
            <Media
              key={item._id}
              id={item._id}
              title={item.title}
              description={item.description}
              rating={item.rating}
              language={item.language}
              loading={false}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchResults;
