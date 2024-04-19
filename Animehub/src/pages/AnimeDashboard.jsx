import "../admin.css";
import { Link } from "react-router-dom";
import { useAnimeContext } from "../hooks/useAnimeContext";
import axios from "axios";
import { useState } from "react";
function AnimeDashboard() {
  
  const expand = () => {
    document.querySelector("#sidebar").classList.toggle("expand");
  };

  const [uploadAnimeObj, setUploadAnimeObj] = useState({
    title: "",
    desc: "",
    imagepath: "",
    categories: "",
    studio: "",
    homeimage: "",
  });
  const [error, setError] = useState("");
  const { animes, dispatch } = useAnimeContext();
  const userObj = JSON.parse(localStorage.getItem("user"));
  let token;
  let user;
  if (userObj) {
    token = userObj.token;
    user = userObj.user;
  }

  const uploadAnime = async () => {
    uploadAnimeObj.categories = uploadAnimeObj.categories.split(" ");

    try {
      const response = await axios.post(
        "https://animehubproject.onrender.com/add/anime",
        uploadAnimeObj
      );
      console.log(response.data);
      dispatch({ type: "UPLOAD_ANIMES", payload: response.data });

      setUploadAnimeObj({
        title: "",
        desc: "",
        imagepath: "",
        categories: "",
        studio: "",
        homeimage: "",
      });
      setError("");
    } catch (error) {
      console.log(error);
      setError("failed to upload anime");
    }
  };

  const deleteAnime = async (id) => {
    try {
      await axios.delete("https://animehubproject.onrender.com/delete/anime/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      dispatch({ type: "DELETE_ANIME", payload: id });
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <div className="wrapper">
        <aside id="sidebar">
          <div className="d-flex">
            <button className="toggle-btn" type="button">
              <i onClick={expand} className="lni lni-grid-alt"></i>
            </button>
            <div className="sidebar-logo">
              <Link to="/admindashboard">Animehub Admin</Link>
            </div>
          </div>
          <ul className="sidebar-nav">
            <li className="sidebar-item">
              <Link to="/Profiledashboard" className="sidebar-link">
                <i className="lni lni-user"></i>
                <span>Profiles</span>
              </Link>
            </li>
          </ul>
          <div className="sidebar-footer">
            <Link to="/" className="sidebar-link">
              <i className="lni lni-exit"></i>
              <span>Back to Animehub</span>
            </Link>
          </div>
        </aside>
        <div className="main">
          <nav className="navbar navbar-expand px-4 py-3">
            <form action="#" className="d-none d-sm-inline-block"></form>
            <div className="navbar-collapse collapse">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item dropdown">
                  <a
                    href="#"
                    data-bs-toggle="dropdown"
                    className="nav-icon pe-md-0"
                  >
                    <img
                      src="/account.png"
                      className="avatar img-fluid"
                      alt=""
                    />
                  </a>
                  <div className="dropdown-menu dropdown-menu-end rounded"></div>
                </li>
              </ul>
            </div>
          </nav>
          <main className="content px-3 py-4">
            <div className="container-fluid overflow-auto">
              <div className="mb-3">
                <h3 className="fw-bold fs-4 mb-3 text-black">Animes</h3>
                <h3 className="fw-bold fs-4 my-3 text-black">Control Center</h3>
                <div className="row">
                  <div className="col-12">
                    <table className="table table-striped">
                      <thead>
                        <tr className="highlight">
                          <th scope="col">#</th>
                          <th scope="col">Anime</th>
                          <th scope="col">Description</th>
                          <th scope="col">image_path</th>
                          <th scope="col">categories</th>
                          <th scope="col">homeimage</th>
                          <th scope="col">studio</th>
                          <th scope="col">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {animes.map((anime) => {
                          return (
                            <tr key={anime._id}>
                              <th scope="row">{anime._id}</th>
                              <td>{anime.title}</td>
                              <td>{anime.desc}</td>
                              <td>{anime.imagepath}</td>
                              <td>
                                {anime.categories.map(
                                  (categorie) => categorie + "\t"
                                )}
                              </td>
                              <td>{anime.homeimage}</td>
                              <td>{anime.studio}</td>
                              <td>
                                <button
                                  className="btn btn-primary"
                                  onClick={() => {
                                    deleteAnime(anime._id);
                                  }}
                                >
                                  delete
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    Name
                    <div className="footer">
                      <div className="container-fluid">
                        <div className="row text-body-secondary">
                          <div className="col-6 text-start">
                            <button
                              type="button"
                              className="btn btn-primary"
                              data-toggle="modal"
                              data-target="#exampleModal"
                            >
                              Add Anime
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div
        className="modal fade text-black"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Upload Anime Information
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="anime">Anime Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="anime"
                    value={uploadAnimeObj.title}
                    onChange={(e) =>
                      setUploadAnimeObj({
                        ...uploadAnimeObj,
                        title: e.target.value,
                      })
                    }
                    placeholder="Enter anime name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows="3"
                    placeholder="Enter description"
                    value={uploadAnimeObj.desc}
                    onChange={(e) =>
                      setUploadAnimeObj({
                        ...uploadAnimeObj,
                        desc: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="image_path">Image Path</label>
                  <input
                    type="text"
                    className="form-control"
                    id="image_path"
                    value={uploadAnimeObj.imagepath}
                    onChange={(e) =>
                      setUploadAnimeObj({
                        ...uploadAnimeObj,
                        imagepath: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="categories">Categories</label>
                  <input
                    type="text"
                    className="form-control"
                    id="categories"
                    placeholder="Enter categories"
                    value={uploadAnimeObj.categories}
                    onChange={(e) =>
                      setUploadAnimeObj({
                        ...uploadAnimeObj,
                        categories: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="categories">studio</label>
                  <input
                    type="text"
                    className="form-control"
                    id="categories"
                    placeholder="Enter studio"
                    value={uploadAnimeObj.studio}
                    onChange={(e) =>
                      setUploadAnimeObj({
                        ...uploadAnimeObj,
                        studio: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="categories">homeimage</label>
                  <input
                    type="text"
                    className="form-control"
                    id="categories"
                    placeholder="Enter homeimage"
                    value={uploadAnimeObj.homeimage}
                    onChange={(e) =>
                      setUploadAnimeObj({
                        ...uploadAnimeObj,
                        homeimage: e.target.value,
                      })
                    }
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={uploadAnime}
              >
                Upload
              </button>
              {error && <div className="alert alert danger">{error}</div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AnimeDashboard;
