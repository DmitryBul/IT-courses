import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function HalfRating() {
  const { id } = useParams();
  const [value, setValue] = React.useState(2.5);
  const prevRating = React.useRef(value);
  const authToken = sessionStorage.getItem("authToken");

  const handleRatingChange = async () => {
    console.log(value);

    try {
      const response = await axios.patch(
        `http://localhost:4444/courses/${id}/rate`,
        { rating: value },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (value !== prevRating.current) {
      handleRatingChange();
      prevRating.current = value;
    }
  }, [value]);

  return (
    <Stack
      spacing={1}
      style={{ marginTop: "10px", marginBottom: "10px", marginLeft: "14px" }}
    >
      <h4>Oceń kurs:</h4>
      <Rating
        name="half-rating"
        value={value}
        onChange={(e, newValue) => {
          setValue(newValue);
        }}
        precision={0.5}
      />
    </Stack>
  );
}
