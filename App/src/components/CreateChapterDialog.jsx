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
import { useNavigate, useParams } from "react-router-dom";
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
  const { id } = useParams();
  const [formData, setFormData] = useState({
    TitleChapter: "",
    TextChapter: "",
    VideoLink: "",
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
        `http://localhost:4444/courses/${id}/newChapter`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const data = response.data;
      setMessage(data.message);
      if (response.status === 200) {
        navigate(`/course/${data._id}`);
        window.location.reload();
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Błąd tworzenia nowego rozdziału"
      );
    }
  };

  return (
    <BootstrapDialog onClose={onClose} open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Tworzenie nowego rozdziału
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
          Wypełnij formę, aby utworzyć rozdział:
        </Typography>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <TextField
              fullWidth
              label="Nazwa rozdziału"
              variant="outlined"
              name="TitleChapter"
              value={formData.TitleChapter}
              onChange={handleChange}
              inputProps={{ maxLength: 30 }}
              required
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <TextField
              fullWidth
              label="Tekst rozdziału"
              variant="outlined"
              name="TextChapter"
              value={formData.TextChapter}
              onChange={handleChange}
              required
              multiline
              rows={5}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <TextField
              fullWidth
              label="Wideo link"
              variant="outlined"
              name="VideoLink"
              value={formData.VideoLink}
              onChange={handleChange}
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
