import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "jquery/dist/jquery.min.js";
import "./App.css";
import { useEffect, useState } from "react";
import Home from "./pages/home.jsx";
import Animes from "./pages/animes.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Animescreen from "./pages/animescreen.jsx";
import Profilepicture from "./pages/profilepicture.jsx";
import UserProfile from "./pages/Account.jsx";
import Favoriteanimes from "./pages/favoriteanime.jsx";
import NotFound from "./pages/notFound.jsx";
import ChangeProfileDetails from "./pages/changeProfileDetails.jsx";
import Admindashboard from "./pages/AdminDashboard.jsx";
import AnimeDashboard from "./pages/AnimeDashboard.jsx";
import ProfileDashboard from "./pages/ProfileDashboard.jsx";
import Chat from "./pages/Chat.jsx";
import Reset from "./pages/passwordreset.jsx"

function App() {
  const userObj = JSON.parse(localStorage.getItem("user"));
  let token;
  let user;
  let chatUser;
  if (userObj) {
    token = userObj.token;
    user = userObj.user;
    chatUser = userObj.chatUser;
  }
  console.log(token, user);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const getUserInfo = async (id) => {
    try {
      const resp = await fetch("https://animehubproject.onrender.com/getuser/" + id, {
        headers: { Authorization: "Bearer " + token },
      });
      const data = await resp.json();

      if (!resp.ok) {
        setError("failed to fetch user");
      }

      if (resp.ok) {
        console.log();
        setUserInfo(data);
      }
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    getUserInfo(user);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/animes" element={<Animes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/animescreen/:id" element={<Animescreen />} />
        <Route path="/forgot/password/:token/:user_id" element={<Reset />} />
        <Route
          path="/chat"
          element={
            user ? <Chat chatUser={chatUser} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/profilepicture"
          element={user ? <Profilepicture /> : <Navigate to="/login" />}
        />
        <Route
          path="/account"
          element={user ? <UserProfile /> : <Navigate to="/login" />}
        />
        <Route
          path="/Animesdashboard"
          element={userInfo.isAdmin ? <AnimeDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/Profiledashboard"
          element={
            userInfo.isAdmin ? <ProfileDashboard /> : <Navigate to="/" />
          }
        />
        <Route
          path="/changeProfile"
          element={user ? <ChangeProfileDetails /> : <Navigate to="/login" />}
        />

        <Route
          path="/favoriteanimes"
          element={user ? <Favoriteanimes /> : <Navigate to="/login" />}
        />
        <Route
          path="/admindashboard"
          element={userInfo.isAdmin ? <Admindashboard /> : <Navigate to="/ " />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
