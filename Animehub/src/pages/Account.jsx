import { useEffect, useState } from "react";
import Header from "../components/header.jsx";
import LogoutButton from "../components/LogoutButton.jsx";
import axios from "axios";

import { Link } from "react-router-dom";

import { useUserContext } from "../hooks/useUserContext.jsx";
export default function UserProfile() {
  const { user, token } = JSON.parse(localStorage.getItem("user"));
  const [image, setImage] = useState("");
  const [userImage, setUserImage] = useState("");
  const { dispatch } = useUserContext();
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
        setUserImage(data.profilepicture);
        setUserInfo(data);
      }
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    getUserInfo(user);
  }, [user]);

  const changeProfilePicture = async () => {
    const formData = new FormData();
    formData.append("image", image);
    try {
      const resp = await axios.patch(
        "https://animehubproject.onrender.com/change-picture/" + user,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        }
      );

      console.log(resp.data);
      window.location.reload();
    } catch (error) {
      setError("failed to upload profile image");
    }
  };

  const deleteAccount = async () => {
    const sure = window.confirm("are you sure?");

    if (!sure) {
      return;
    }
    try {
      await axios.delete("https://animehubproject.onrender.com/user/delete/" + user, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      dispatch({ type: "LOGOUT_USER" });
      localStorage.removeItem("user");
      window.location.assign("/");
    } catch (error) {
      setError(error);
    }
  };

  console.log(userInfo.profilepicture);

  return (
    <div>
      <Header>{user && <LogoutButton></LogoutButton>}</Header>
      <div className="container mb-5" style={{ width: "50%" }}>
        <div className="row">
          <div className="col-md-2-6 col-sm-6 d-flex justify-content-center">
            <img
              className="img-fluid rounded-circle mb-2 profilepic"
              alt="profilkep"
              style={{ maxHeight: "300px" }}
              src={
                userImage.includes("googleusercontent")
                  ? userImage
                  : "./public/uploads/" + userImage
              }
            />
          </div>
          {console.log(image)}
          <div className="col-md-2-6 col-sm-6 justify-content-center  align-self-center text-center">
            <p>
              <strong>Username: {userInfo.username}</strong>
            </p>
          </div>
          <div className="profilepicture">
            <p>Change Profile picture <input
              type="file"
              accept="image/*"
              className="btn btn-primary m-3 search"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <button className="btn btn-primary m-3 search" onClick={changeProfilePicture}>save</button></p>
            
          </div>
        </div>
      </div>

      <div className="container" style={{ width: "50%" }}>
        <div className="row">
          <button
            className="btn btn-secondary search rounded mb-2 p-2 w-100 text-center "
            style={{ marginBottom: "20px" }}
          >
            <Link to="/chat">chat with users</Link>
          </button>
          <Link
            to="/favoriteanimes"
            className="search rounded mb-2 p-2 w-100 text-center  "
          >
            Favorite Animes
          </Link>

          <a
            href="/changeProfile"
            className="search rounded mb-2 p-2 w-100 text-center "
          >
            Change Profile details
          </a>

          <a
            className="search rounded mb-2 p-2 w-100 text-center "
            onClick={deleteAccount}
            href=""
          >
            Delete Profile
          </a>
          {userInfo.isAdmin && (
            <Link
              className="search rounded mb-2 p-2 w-100 text-center "
              to="/admindashboard"
            >
              Admin Dashboard
            </Link>
          )}
        </div>
      </div>
      {error && <div className="alert alert-danger">{error.message}</div>}
    </div>
  );
}
