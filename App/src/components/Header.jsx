import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import CustomizedDialogs from "./CreateCourseDialog";

export default function SearchAppBar() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    const authToken = sessionStorage.getItem("authToken");
    if (!authToken) {
      navigate("/login");
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  const navigate = useNavigate();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" component="span" sx={{ flexGrow: 1 }}>
          <a style={{ color: "white" }} href="/">
            IT courses
          </a>
        </Typography>
        <IconButton size="large" color="inherit" onClick={handleOpenDialog}>
          <CreateIcon />
        </IconButton>
        <IconButton
          size="large"
          color="inherit"
          onClick={() => navigate("/profile")}
        >
          <AccountCircleIcon />
        </IconButton>
        <CustomizedDialogs open={dialogOpen} onClose={handleCloseDialog} />
      </Toolbar>
    </AppBar>
  );
}
