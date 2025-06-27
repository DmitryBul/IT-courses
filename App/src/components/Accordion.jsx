import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Button } from "@mui/material";
import CustomizedMenus from "../components/ChapterOptions";

export default function AccordionExpandIcon({
  chapterId,
  TitleChapter,
  TextChapter,
  VideoLink,
  author,
}) {
  const renderVideoButton = () => {
    if (VideoLink) {
      return (
        <Button
          variant="contained"
          onClick={() => (window.location.href = VideoLink)}
          style={{ marginBottom: "20px" }}
        >
          Video
        </Button>
      );
    } else {
      return null;
    }
  };

  const renderOptions = () => {
    if (author == sessionStorage.getItem("id")) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "right",
            marginRight: "3%",
            marginTop: "2%",
            marginBottom: "2%",
          }}
        >
          <CustomizedMenus
            chapterId={chapterId}
            TitleChapter={TitleChapter}
            TextChapter={TextChapter}
            VideoLink={VideoLink}
          />
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">{TitleChapter}</Typography>
        </AccordionSummary>
        {renderOptions()}
        <AccordionDetails>
          <Typography>{TextChapter}</Typography>
        </AccordionDetails>
        {renderVideoButton()}
      </Accordion>
    </div>
  );
}
