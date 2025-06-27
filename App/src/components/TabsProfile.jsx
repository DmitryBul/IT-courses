import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({
  userInfo,
  completedCourses,
  savedCourses,
  createdCourses,
}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Zapisane kursy" {...a11yProps(0)} />
          <Tab label="Zakończone kursy" {...a11yProps(1)} />
          <Tab label="Stworzone kursy" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {userInfo ? (
            <>
              {savedCourses.map((item, index) => (
                <>
                  <Link to={`/course/${item._id}`} style={{ color: "black" }}>
                    <h3>{item.title}</h3>
                  </Link>
                </>
              ))}
            </>
          ) : (
            <p>Ładowanie danych</p>
          )}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {userInfo ? (
            <>
              {completedCourses.map((item, index) => (
                <>
                  <Link to={`/course/${item._id}`} style={{ color: "black" }}>
                    <h3>{item.title}</h3>
                  </Link>
                </>
              ))}
            </>
          ) : (
            <p>Ładowanie danych</p>
          )}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {userInfo ? (
            <>
              {createdCourses.map((item, index) => (
                <>
                  <Link to={`/course/${item._id}`} style={{ color: "black" }}>
                    <h3>{item.title}</h3>
                  </Link>
                </>
              ))}
            </>
          ) : (
            <p>Ładowanie danych</p>
          )}
        </div>
      </CustomTabPanel>
    </Box>
  );
}
