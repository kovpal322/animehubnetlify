import Header from "../components/header.jsx";
import axios from "axios";

import { useState, useEffect } from "react";

export default function Favoriteanimes() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { user, token } = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const [favAnimes, setFavAnimes] = useState([]);

  const getfavoriteAnimes = async () => {
    try {
      const resp = await axios.get(
        "http://localhost:4000/get/favanimes/" + user
      );

      setFavAnimes(resp.data);
      console.log(favAnimes);
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };
  useEffect(() => {
    getfavoriteAnimes();
  }, [user.length]);

  const removeAnimeFromFavorites = async (id) => {
    try {
      const resp = await axios.patch(
        "http://localhost:4000/remove/favanime/" + user,
        { animeId: id }
      );
      setFavAnimes(favAnimes.filter((anime) => anime._id !== id));
      setSuccess(resp.data);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      <Header>
      </Header>
      <div className="container" style={{ marginTop: "5%" }}>
        <h1>Your Favorite Animes</h1>
        <div className="row justify-content-start">
  {favAnimes.map((anime, index) => (
    <div key={index} className="col-md-2 col-sm-4 col-6">
      <div className="card text-center bg-transparent border-0" style={{ height: "100%" }}>
        <div className="card-body d-flex flex-column justify-content-between animatedcard m-2" style={{ height: "100%" }}>
          <a className="card-item" href={`animescreen/${anime._id}`}>
            <img
              src={anime.imagepath}
              className="card-item rounded img-fluid"
              alt="Card Image"
            />
          </a>
          <h5 className="card-title text-white mt-3 card-item">
            {anime.title}
          </h5>
        </div>
        <button
          className="btn btn-danger "
          onClick={() => removeAnimeFromFavorites(anime._id)}
        >
          remove{" "}
        </button>
      </div>
    </div>
  ))}
</div>

      </div>
    </>
  );
}
