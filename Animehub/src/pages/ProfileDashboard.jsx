import { useEffect, useState } from "react";

import "../admin.css";
import axios from "axios";
import { Link } from "react-router-dom";
const user = JSON.parse(localStorage.getItem("user"));
function ProfileDashboard() {
  useEffect(() => {
    const bodyStyle = {
      paddingTop: '0%',
      backgroundColor: 'transparent',
      fontFamily: "'Poppins', sans-serif"
    };

    Object.assign(document.body.style, bodyStyle);

    return () => {
      const defaultStyle = {
        paddingTop: '0%',
      backgroundColor: 'transparent',
      fontFamily: "'Poppins', sans-serif"
      };
      Object.assign(document.body.style, defaultStyle);
    };
  }, []);
  const expand = () => {
    document.querySelector("#sidebar").classList.toggle("expand");
  };
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const getUsres = async () => {
      try {
        const resp = await axios.get("https://animehubproject.onrender.com/get/users", {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        });
        setUsers(resp.data);
      } catch (error) {
        setError(error);
      }
    };
    getUsres();
  }, []);

  const deleteUser = async (id) => {
    const sure = window.confirm("are you sure?");

    if (!sure) {
      return;
    }
    try {
      await axios.delete("https://animehubproject.onrender.com/user/delete/" + id, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      });

      setUsers(users.filter((user) => user._id !== id));
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
              <Link to="/Animesdashboard" className="sidebar-link">
                <i className="lni lni-agenda"></i>
                <span>Animes</span>
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
            <div className="container-fluid">
              <div className="mb-3">
                <h3 className="fw-bold fs-4 mb-3 text-black">Profiles</h3>
                <h3 className="fw-bold fs-4 my-3 text-black">Control Center</h3>
                <div className="row">
                  <div className="col-12">
                    <table className="table table-striped">
                      <thead>
                        <tr className="highlight">
                          <th scope="col">#</th>
                          <th scope="col">Username</th>
                          <th scope="col">Password</th>
                          <th scope="col">image_path</th>
                          <th scope="col">Admin</th>
                          <th scope="col">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users &&
                          users.map((user) => {
                            return (
                              <tr key={user._id}>
                                <th scope="row">{user._id}</th>
                                <td>{user.username}</td>
                                <td>{user.password}</td>
                                <td>{user.profilepicture}</td>
                                <td>{user.isAdmin}</td>
                                <td>
                                  <button
                                    className="btn btn-primary"
                                    onClick={() => deleteUser(user._id)}
                                  >
                                    delete
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                    <div className="footer">
                      <div className="container-fluid">
                        <div className="row text-body-secondary">
                          <div className="col-6 text-start"></div>
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
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                  />
                </div>
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="admin"
                  />
                  <label className="form-check-label" htmlFor="admin">
                    Admin
                  </label>
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
              <button type="button" className="btn btn-primary">
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileDashboard;
