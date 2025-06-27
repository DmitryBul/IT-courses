import Header from "../components/Header";
import React, { useState } from "react";
import { Button, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import FolderList from "../components/List";
import AccordionExpandIcon from "../components/Accordion";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import MediaCard from "../components/CourseInfoCard";
import { useLocation } from "react-router-dom";
import CustomizedDialogs from "../components/CreateChapterDialog";
import StyledMenu from "../components/CourseOptions";
import OptionsUser from "../components/CourseOptionWithoutToken";

const CoursePage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  const [data, setData] = React.useState([]);
  const { id } = useParams();
  const [chapters, setChapters] = useState([]);
  const location = useLocation();
  const { imgURL } = location.state || {};
  React.useEffect(() => {
    axios.get(`http://localhost:4444/courses/${id}`).then((response) => {
      setData(response.data);
      setChapters(response.data.ChaptersArray);
    });
  }, [id]);

  const renderAddChapterButton = () => {
    if (data.author == sessionStorage.getItem("id")) {
      return (
        <Button
          variant="outlined"
          color="primary"
          style={{ width: "100%", marginBottom: "20px" }}
          onClick={handleOpenDialog}
        >
          Dodaj rozdział
        </Button>
      );
    } else {
      return null;
    }
  };

  const renderOptions = () => {
    if (data.author == sessionStorage.getItem("id")) {
      return (
        <div style={{ marginTop: "7%" }}>
          <StyledMenu
            title={data.title}
            description={data.description}
            language={data.language}
          />
        </div>
      );
    } else {
      return (
        <div style={{ marginTop: "7%" }}>
          <OptionsUser
            title={data.title}
            description={data.description}
            language={data.language}
          />
        </div>
      );
    }
  };

  const chapterTitles = chapters.map((chapter) => chapter.TitleChapter);
  return (
    <>
      <Header />
      <Container>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <h1>{data.title}</h1>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "3%",
              marginLeft: "15%",
            }}
          >
            <MediaCard
              description={data.description}
              imgURL={
                imgURL ||
                "https://mc.today/wp-content/uploads/2023/03/Depositphotos_183741614Progr-1024x768.jpg.webp"
              }
            />
            <FolderList
              key={data._id}
              rating={data.rating}
              language={data.language}
            />
            {renderOptions()}
          </div>

          {chapters.map((item, index) => (
            <>
              <Divider style={{ marginTop: "30px" }}>
                <Chip
                  key={index}
                  label={`${index + 1} rozdział`}
                  size="small"
                />
              </Divider>
              <AccordionExpandIcon
                key={item._id}
                chapterId={item._id}
                TitleChapter={item.TitleChapter}
                TextChapter={item.TextChapter}
                VideoLink={item.VideoLink}
                author={data.author}
              />
            </>
          ))}
        </div>
        {renderAddChapterButton()}
        <CustomizedDialogs open={dialogOpen} onClose={handleCloseDialog} />
      </Container>
    </>
  );
};

export default CoursePage;
