import { useState, useEffect } from "react";

const Header = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  console.log(user);
  const [userInfo, setUserInfo] = useState();
  const getUserInfo = async (id) => {
    try {
      const resp = await fetch("https://animehubproject.onrender.com/getuser/" + id, {
        headers: { Authorization: "Bearer " + user.token },
      });
      const data = await resp.json();

      if (!resp.ok) {
      }

      if (resp.ok) {
        console.log();
        setUserInfo(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserInfo(user && user.user);
  }, []);

  return (
    <header>
      <nav
        className="navbar navbar-expand-lg fixed-top"
        style={{ backgroundColor: "#121221" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand nav-link" href="/">
            <img className="logo" src="shop3.png" alt="" />
            Animehub
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="lni lni-menu" style={{ color: "white" }}>
              <a href="./menu-bar.png"></a>
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/animes">
                  Animes
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  href="/account"
                  aria-disabled="true"
                >
                  Account
                </a>
              </li>
            </ul>
            {userInfo && <p className="m-3">{userInfo.username}</p>}
            {userInfo && (
              <img
                src={
                  userInfo.profilepicture.includes("googleusercontent")
                    ? userInfo.profilepicture
                    : `./public/uploads/${userInfo.profilepicture}`
                }
                className="user-image"
              ></img>
            )}
            {children}
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;
