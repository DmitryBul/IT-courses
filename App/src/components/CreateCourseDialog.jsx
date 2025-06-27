import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    width: "600px",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(3),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
  },
}));

export default function CustomizedDialogs({ open, onClose }) {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    language: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = sessionStorage.getItem("authToken");
      const response = await axios.post(
        "http://localhost:4444/courses",
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const data = response.data;
      setMessage(data.message);
      if (response.status === 201) {
        navigate(`/course/${data._id}`);
        window.location.reload();
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Błąd tworzenia nowego kursu"
      );
    }
  };

  return (
    <BootstrapDialog onClose={onClose} open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Tworzenie nowego kursu
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1" gutterBottom>
          Wypełnij formę, aby utworzyć kurs:
        </Typography>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <TextField
              fullWidth
              label="Nazwa kursu"
              variant="outlined"
              name="title"
              value={formData.title}
              onChange={handleChange}
              inputProps={{ maxLength: 30 }}
              required
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <TextField
              fullWidth
              label="Opis kursu"
              variant="outlined"
              name="description"
              value={formData.description}
              onChange={handleChange}
              inputProps={{ maxLength: 100 }}
              required
              multiline
              rows={3}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <TextField
              fullWidth
              label="Język kursu"
              variant="outlined"
              name="language"
              value={formData.language}
              onChange={handleChange}
              inputProps={{ pattern: "[A-Za-z]+" }}
              title="Tylko litery"
              required
            />
          </div>
          <DialogActions>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ textTransform: "none" }}
            >
              Zapisz
            </Button>
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{ textTransform: "none" }}
            >
              Anuluj
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </BootstrapDialog>
  );
}
