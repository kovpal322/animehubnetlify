import Header from "../components/header.jsx";
import axios from "axios";
import { useAnimeContext } from "../hooks/useAnimeContext.jsx";
import { useParams } from "react-router-dom";
import LogoutButton from "../components/LogoutButton.jsx";

import { useState, useEffect } from "react";
import Postform from "../components/Postform.jsx";
export default function AnimeDetails() {
  const { animes } = useAnimeContext();
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [comments, setComments] = useState([]);
  const [pages, setPages] = useState(1);
  const [showMore, setShowMore] = useState(true);
  const userObj = JSON.parse(localStorage.getItem("user"));
  let token;
  let user;
  if (userObj) {
    token = userObj.token;
    user = userObj.user;
  }

  const params = useParams();

  const singleAnime = animes.find((anime) => anime._id == params.id);

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
        setUserInfo(data);
      }
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    if (user) getUserInfo(user);
  }, []);

  const addTofavorites = async (id) => {
    try {
      const resp = await axios.patch(
        `https://animehubproject.onrender.com/update/favanimes/${id}`,
        { animeId: singleAnime._id },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setMessage(resp.data);
    } catch (err) {
      console.log(error);
      setError(err);
    }
    setTimeout(() => {
      setError(null);
      setMessage(null);
    }, 2000);
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const resp = await axios.get(
          `https://animehubproject.onrender.com/get/comments/${singleAnime._id}/${pages}`
        );
        setShowMore(resp.data.showMore);
        setComments(resp.data.comments);
        console.log(resp.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [singleAnime, pages]);

  const postComment = async (comment) => {
    if (!user) {
      window.location.assign("/login");
      return;
    }
    if (!comment) {
      setError("cant post empty comment");
      return;
    }
    const postObj = {
      userId: userInfo._id,
      animeId: singleAnime._id,
      text: comment,
    };
    try {
      const resp = await axios.post(
        "https://animehubproject.onrender.com/post/comment",
        postObj,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(resp.data);
      setComments([...comments, resp.data].reverse());
    } catch (error) {
      setError("failed to post comment");
    }
  };
  return (
    <div>
      <Header>{user && <LogoutButton></LogoutButton>}</Header>
      <div className="container" style={{ maxWidth: "50%" }}>
        <section className="sec1">
          <div className="row">
            <div className="col-md-2-6 col-sm-6">
              <img
                src={singleAnime && singleAnime.imagepath}
                className="rounded img-fluid"
                alt="Animeimage"
              />
            </div>
            <div className="col-md-2-6 col-sm-6">
              <p>
                <strong>Name: {singleAnime && singleAnime.title}</strong>
                <br />
                {singleAnime &&
                  singleAnime.categories.map((item, index) => {
                    return <span key={index}> {item.name} </span>;
                  })}
                <br />
                Description:{singleAnime && singleAnime.desc}
              </p>
              {error && <div className="alert alert-danger">{error}</div>}
              {message && <div className="alert alert-success">{message}</div>}
              <button
                onClick={() =>
                  user
                    ? addTofavorites(userInfo._id)
                    : window.location.assign("/login")
                }
                className="btn btn-success"
              >
                add to favorite
              </button>
            </div>
          </div>
        </section>
      </div>
      <div className="container">
        {comments && comments.length ? (
          comments.map((comment) => {
            return (
              <div key={comment._id} className="comment-body">
                <h3><img
                  src={comment.userInformation[0].profilepicture}
                  alt="user's profile picture"
                />{comment.userInformation[0].username}</h3>
                <p>{comment.text}</p>
                <p>{comment.createdAt.split('T')[0]}</p>
              </div>
            );
          })
        ) : (
          <p>no comments yet</p>
        )}

        {showMore && (
          <button className="btn btn-primary mb-4"
            onClick={() => {
              setPages((prevValue) => prevValue + 1);
            }}
          >
            show more
          </button>
        )}
      </div>
      <Postform postComment={postComment}></Postform>
    </div>
  );
}
