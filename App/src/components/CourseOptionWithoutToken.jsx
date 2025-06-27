import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import FavoriteIcon from "@mui/icons-material/Favorite";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: "rgb(55, 65, 81)",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
    ...theme.applyStyles("dark", {
      color: theme.palette.grey[300],
    }),
  },
}));

export default function CustomizedMenus(title, description, language) {
  const navigate = useNavigate();

  const { id } = useParams();

  const authToken = sessionStorage.getItem("authToken");

  const [isCompleted, setIsCompleted] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSaveCourse = () => {
    axios.post(
      `http://localhost:4444/courses/${id}/save`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    window.location.reload();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteCourseFromSaved = () => {
    axios.delete(`http://localhost:4444/courses/${id}/save`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    window.location.reload();
  };

  const handleFinishCourse = () => {
    axios.post(
      `http://localhost:4444/courses/${id}/complete`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    window.location.reload();
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4444/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const data = response.data;
        setIsCompleted(
          data.completedCourses.some((course) => course._id === id)
        );
        setIsSaved(data.savedCourses.some((course) => course._id === id));
      } catch (error) {
        console.error("Błąd przy otrzymaniu danych użytkownika:", error);
      }
    };

    fetchData();
  }, []);

  if (isCompleted && !isSaved) {
    return (
      <div>
        <Button
          id="demo-customized-button"
          aria-controls={open ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="contained"
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
        >
          Options
        </Button>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose && handleSaveCourse} disableRipple>
            <FavoriteIcon />
            Zapisz kurs
          </MenuItem>
        </StyledMenu>
      </div>
    );
  }

  if (isCompleted && isSaved) {
    return (
      <div>
        <Button
          id="demo-customized-button"
          aria-controls={open ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="contained"
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
        >
          Options
        </Button>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem
            onClick={handleClose && handleDeleteCourseFromSaved}
            disableRipple
          >
            <DeleteIcon />
            Usuń z zapisanych
          </MenuItem>
        </StyledMenu>
      </div>
    );
  }

  if (!isCompleted && isSaved) {
    return (
      <div>
        <Button
          id="demo-customized-button"
          aria-controls={open ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="contained"
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
        >
          Options
        </Button>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem
            onClick={handleClose && handleDeleteCourseFromSaved}
            disableRipple
          >
            <DeleteIcon />
            Usuń z zapisanych
          </MenuItem>
          <MenuItem onClick={handleFinishCourse} disableRipple>
            <BeenhereIcon />
            Ukończono kurs
          </MenuItem>
        </StyledMenu>
      </div>
    );
  }

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Options
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose && handleSaveCourse} disableRipple>
          <FavoriteIcon />
          Zapisz kurs
        </MenuItem>
        <MenuItem onClick={handleFinishCourse} disableRipple>
          <BeenhereIcon />
          Ukończono kurs
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
