import "../admin.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function Admindashboard() {
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

  const { user, token } = JSON.parse(localStorage.getItem("user"));

  const [error, setError] = useState("");
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
    <div className="wrapper">
      <aside id="sidebar">
        <div className="d-flex">
          <button className="toggle-btn" type="button">
            <i onClick={expand} className="lni lni-grid-alt"></i>
          </button>
        </div>
        <ul className="sidebar-nav">
          <li className="sidebar-item">
            <Link to="/Profiledashboard" className="sidebar-link">
              <i className="lni lni-user"></i>
              <span>Profiles</span>
            </Link>
          </li>
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
                    src="../public/3497776.jpg"
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
              <h3 className="fw-bold fs-2 my-3 text-center text-black">
                welcome {userInfo.username}
              </h3>
              <h3 className="fw-bold fs-4 mb-3 text-black">
                Choose what you want
              </h3>
              <div className="row justify-content-center ">
                <div className="card m-3" style={{ width: "18rem" }}>
                  <div className="card-body">
                    <h5 className="card-title">Profile management</h5>
                    <p className="card-text">
                      You can manage the accounts in the website
                    </p>
                    <Link to="/Profiledashboard" className="btn btn-primary">
                      Go to Profiles
                    </Link>
                  </div>
                </div>
                <div className="card m-3" style={{ width: "18rem" }}>
                  <div className="card-body">
                    <h5 className="card-title">Anime management</h5>
                    <p className="card-text">
                      You can manage the animes on the website
                    </p>
                    <Link to="/Animesdashboard" className="btn btn-primary">
                      Go to Animes
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Admindashboard;
