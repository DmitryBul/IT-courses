import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import StarsIcon from "@mui/icons-material/Stars";
import LanguageIcon from "@mui/icons-material/Language";
import HalfRating from "../components/Rating";
import { yellow } from "@mui/material/colors";

export default function FolderList({ rating, language }) {
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        textAlign: "left",
        borderRadius: 3,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div style={{ display: "flex" }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: "#ffd54f" }}>
              <StarsIcon sx={{ color: yellow[50] }} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Rating" secondary={rating} />
        </ListItem>
      </div>

      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "#29b6f6" }}>
            <LanguageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Język" secondary={language} />
      </ListItem>
      <HalfRating />
    </List>
  );
}
