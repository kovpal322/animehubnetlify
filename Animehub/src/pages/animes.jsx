import Header from "../components/header.jsx";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Animes() {
  const [search, setSearch] = useState("");
  const [newAnimes, setNewAnimes] = useState([]);
  const [animes, setAnimes] = useState([]);
  const [genres, setgenres] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const response = await axios.get(
          "https://animehubproject.onrender.com/get/animes/?q=" + search
        );
        setAnimes(response.data);
        setNewAnimes(response.data);
      } catch (err) {
        setError(err);
        console.log(err);
      }
    };
    fetchAnimes();
  }, [search]);

  const filtrerByGenres = async (value) => {
    console.log(newAnimes);
    setNewAnimes(
      animes.filter((anime) => anime.categories.some((item) => item === value))
    );
  };

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          "https://animehubproject.onrender.com/get/categories/?q=" + search
        );
        setgenres(response.data);
      } catch (err) {
        setError(err);
        console.log(err);
      }
    };
    fetchGenres();
  }, []);

  return (
    <>
      <Header>
        <form className="d-flex" role="search">
          <input
            className=" rounded me-2 search"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </form>
      </Header>
      <div className="container">
        <h1>Explore anime movies and TV shows</h1>
        <div className=" d-flex p-2 justify-content-start flex-wrap categorysection">
          {genres.map((genre, index) => (
            <div key={index} className="col-md-2 col-sm-4 col-4">
              <button
                className="category mr-3 mb-2 py-2"
                onClick={() => filtrerByGenres(genre.name)}
              >
                {genre.name}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="container" style={{ marginTop: "5%" }}>
  <div className="row justify-content-start">
    {newAnimes.map((anime, index) => (
      <div key={index} className="col-md-3 col-sm-4 col-6">
        <div className="card text-center bg-transparent border-0" style={{ height: "100%" }}>
          <div className="card-body d-flex flex-column justify-content-between animatedcard m-2" style={{ height: "100%" }}>
            <a className="card-item" href={"/animescreen/" + anime._id}>
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
        </div>
      </div>
    ))}
  </div>
</div>

    </>
  );
}
