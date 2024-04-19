
import Header from "../components/header.jsx";
import {useUserContext} from "../hooks/useUserContext.jsx";
import LogoutButton from "../components/LogoutButton.jsx";

export default function Profilepicture() {
  const {user}=useUserContext()
  return (
    <div>
      <Header>{
        user&&<LogoutButton></LogoutButton>
      }</Header>
      <div className="container">
        <div id="carouselExample" className="carousel slide">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="j.png"
                className=" mx-auto d-block rounded-circle img-fluid img-thumbnail"
                alt="..."
                style={{ height: "600px", width: "600px" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="shop3.png"
                className=" mx-auto d-block rounded-circle img-fluid img-thumbnail"
                alt="..."
                style={{ height: "600px", width: "600px" }}
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <form action="account.html" className="d-flex justify-content-center">
          <button className="search p-2 rounded mt-5">Kiválaszt</button>
        </form>
      </div>
    </div>
  );
}
