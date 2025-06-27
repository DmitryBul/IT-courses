import * as React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";
import { Link } from "react-router-dom";

function Media({ id, title, description, rating, language, loading }) {
  const images = [
    "https://itmentor.by/images/articles/besplatnye-it-kursy-inteticslab-1.png",
    "https://static.tildacdn.com/tild6138-3934-4264-b566-636464356634/1.svg",
    "https://hostiq.ua/blog/wp-content/uploads/2020/11/children-programming-courses.png",
    "https://mc.today/wp-content/uploads/2023/03/Depositphotos_183741614Progr-1024x768.jpg.webp",
  ];

  const randomImage = images[Math.floor(Math.random() * images.length)];
  return (
    <Link to={`/course/${id}`} state={{ imgURL: randomImage }}>
      <Card sx={{ width: 345, m: 2, height: 295 }}>
        <CardHeader
          avatar={
            loading ? (
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
              />
            ) : (
              <Avatar
                sx={{ backgroundColor: "#cfd8dc" }}
                alt="Author Avatar"
                src="https://i.pinimg.com/originals/f7/87/8c/f7878c694e878a47bc2f1a60ccaa31e1.png"
              />
            )
          }
          title={
            loading ? (
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
              />
            ) : (
              title
            )
          }
          subheader={
            loading ? (
              <Skeleton animation="wave" height={10} width="40%" />
            ) : (
              `Rating: ${rating} | ${language}`
            )
          }
        />
        {loading ? (
          <Skeleton
            sx={{ height: 190 }}
            animation="wave"
            variant="rectangular"
          />
        ) : (
          <CardMedia
            sx={{ backgroundColor: "#90a4ae" }}
            component="img"
            height="140"
            image={randomImage}
            alt="Image"
          />
        )}
        <CardContent>
          {loading ? (
            <>
              <Skeleton
                animation="wave"
                height={10}
                style={{ marginBottom: 6 }}
              />
              <Skeleton animation="wave" height={10} width="80%" />
            </>
          ) : (
            <Typography
              variant="body2"
              component="p"
              sx={{ color: "text.secondary" }}
            >
              {description}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  rating: PropTypes.number,
  language: PropTypes.string,
};

function CourseSkeleton() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    axios.get("http://localhost:4444/courses").then((response) => {
      const sortedData = response.data
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 12);

      setData(sortedData);
      setLoading(false);
    });
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "16px",
        margin: "20px",
      }}
    >
      {loading ? (
        <>
          <Media loading />
          <Media loading />
          <Media loading />
          <Media loading />
        </>
      ) : (
        data.map((item) => (
          <Media
            key={item._id}
            id={item._id}
            title={item.title}
            description={item.description}
            rating={item.rating}
            language={item.language}
            loading={false}
          />
        ))
      )}
    </div>
  );
}

export default React.memo(CourseSkeleton);
