import { useEffect, useState } from "react";
import Header from "../components/header.jsx";
import React from "react";
import { jwtDecode } from "jwt-decode";

import axios from "axios";
import { useUserContext } from "../hooks/useUserContext.jsx";
export default function Login() {
  const [toggle, setToggle] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [error, setError] = useState(null);
  const { dispatch } = useUserContext();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://animehubproject.onrender.com/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error);
    }

    if (response.ok) {
      dispatch({ type: "LOGIN_USER", payload: data });
      localStorage.setItem("user", JSON.stringify(data));
      window.location.assign("/");
    }
  };
  const handleGoogleLogin = (response) => {
    const responseObj = jwtDecode(response.credential);

    const loginUser = async () => {
      try {
        const resp = await axios.post("https://animehubproject.onrender.com/google/login", {
          name: responseObj.name,
          email: responseObj.email,
          picture: responseObj.picture,
        });

        dispatch({ type: "LOGIN_USER", payload: resp.data });
        localStorage.setItem("user", JSON.stringify(resp.data));
        window.location.assign("/");
      } catch (err) {
        console.log(err);
      }
    };
    loginUser();
    console.log(responseObj);
  };
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "302793200660-9boro66o4bp1ielc82jcvot1h5s85kmc.apps.googleusercontent.com",
      callback: handleGoogleLogin,
    });

    google.accounts.id.renderButton(document.getElementById("googleLoginDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  const sendEmail = async (e) => {
    e.currentTarget.disabled = true;
    e.currentTarget.style.opacity = "0.2";
    e.currentTarget.style.cursor = "not-allowed";
    try {
      const resp = await axios.post("https://animehubproject.onrender.com/forgot-password", {
        email: forgotEmail,
      });
      if (Object.keys(resp.data).length) setSuccessMessage(resp.data);
      else setSuccessMessage("");
      setTimeout(() => {
        e.target.disabled = false;
        e.target.style.opacity = "1";
        e.target.style.cursor = "pointer";
      }, 10000);
    } catch (error) {
      setEmailError("failed to send email");
    }
  };
  return (
    <>
      <Header>
        <a href="register" className="btn btn-primary">
          register
        </a>
      </Header>
      <div id="login">
        <h3 className="text-center text-white pt-5">Welcome Back</h3>
        <div className="container">
          <div
            id="login-row"
            className="row justify-content-center align-items-center"
          >
            <div id="login-column" className="col-md-6">
              <div id="login-box" className="col-md-12">
                <form
                  id="login-form"
                  className="form"
                  action=""
                  onSubmit={handleSubmit}
                >
                  <div className="form-group">
                    <label htmlFor="email" className="text-white">
                      email
                    </label>
                    <br />
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="form-control border-0 search"
                      placeholder="Enter your email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="text-white">
                      Password:
                    </label>
                    <br />
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="form-control border-0 search"
                      placeholder="Enter your password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="line">
                    <p>or</p>
                    <div id="googleLoginDiv"></div>
                  </div>

                  <div className="form-group">
                    <br />
                    <input
                      type="submit"
                      name="submit"
                      className="btn btn-primary mb-3 mt-3"
                      value="submit"
                    />
                  </div>
                </form>
                <button
                  className="btn btn-primary"
                  onClick={() => setToggle((prevVal) => !prevVal)}
                >
                  Forgot Password
                </button>

                {error && <div> {error}</div>}

                {toggle && (
                  <div className="modal-overlay">
                    <div className="modal-content">
                      <form className="reset-email-form">
                        <button className="btn btn-danger ">close</button>
                        <h2>Reset Password</h2>
                        <input
                          type="email"
                          placeholder="Email"
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                        />
                        {!emailError && (
                          <button
                            className="send-btn"
                            type="button"
                            onClick={sendEmail}
                          >
                            Send Email
                          </button>
                        )}

                        {successMessage && <p>{successMessage}</p>}
                        {emailError && <p>{emailError}</p>}
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
