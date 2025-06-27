import React from "react";
import Avatar from "@mui/material/Avatar";
import { Container } from "@mui/material";
import Header from "../components/Header";
import axios from "axios";
import Tabs from "../components/TabsProfile";
import Divider from "@mui/material/Divider";

const UserProfile = () => {
  const [userInfo, setUserInfo] = React.useState(null);
  const authToken = sessionStorage.getItem("authToken");

  React.useEffect(() => {
    axios
      .get(`http://localhost:4444/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setUserInfo(response.data);
      });
  }, [authToken]);

  return (
    <>
      <Header />
      <Container>
        <div
          className="UserInfo"
          style={{ marginTop: "10%", textAlign: "center" }}
        >
          {userInfo ? (
            <>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Avatar
                  src="/broken-image.jpg"
                  style={{ width: 100, height: 100, marginRight: "3%" }}
                />
                <h3 style={{ marginTop: "3%", marginRight: "1%" }}>
                  {userInfo.firstName}
                </h3>
                <h3 style={{ marginTop: "3%" }}>{userInfo.secondName}</h3>
              </div>
              <Divider style={{ marginTop: "3%" }}></Divider>
              <Tabs
                userInfo={userInfo}
                completedCourses={userInfo.completedCourses}
                savedCourses={userInfo.savedCourses}
                createdCourses={userInfo.createdCourses}
              />
            </>
          ) : (
            <p>Ładowanie danych</p>
          )}
        </div>
      </Container>
    </>
  );
};

export default UserProfile;
